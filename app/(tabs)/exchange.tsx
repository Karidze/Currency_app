import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { getTopRates } from "../../lib/nbpApi";
import { Screen, Text, Card, Icon, Button, Input } from "../../components/ui"; 
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "./exchange.styles";

export default function ExchangeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  
  const [fromAccount, setFromAccount] = useState<any>(null);
  const [toAccount, setToAccount] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("0.00");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      const { data: wallets } = await supabase.from("wallets").select("*").eq("user_id", user.id);
      
      const allAccounts = [
        { id: 'main', currency_code: 'PLN', balance: profile?.balance || 0, is_main: true },
        ...(wallets || [])
      ];
      
      setAccounts(allAccounts);
      
      // Инициализация при первой загрузке
      if (!fromAccount) setFromAccount(allAccounts[0]); 
      if (!toAccount && allAccounts.length > 1) setToAccount(allAccounts[1]);
      
      const marketRates = await getTopRates();
      setRates(marketRates);
    } catch (e) {
      console.error(e);
    }
  };

  // Функция для точечного обновления балансов после обмена
  const refreshBalances = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    const { data: wallets } = await supabase.from("wallets").select("*").eq("user_id", user.id);
    
    const allAccounts = [
      { id: 'main', currency_code: 'PLN', balance: profile?.balance || 0, is_main: true },
      ...(wallets || [])
    ];
    
    setAccounts(allAccounts);

    // Обновляем текущие выбранные аккаунты новыми данными из базы
    if (fromAccount) {
      const updatedFrom = allAccounts.find(a => a.currency_code === fromAccount.currency_code);
      if (updatedFrom) setFromAccount(updatedFrom);
    }
    if (toAccount) {
      const updatedTo = allAccounts.find(a => a.currency_code === toAccount.currency_code);
      if (updatedTo) setToAccount(updatedTo);
    }
  };

  useEffect(() => {
    if (!amount || !fromAccount || !toAccount || rates.length === 0) {
      setResult("0.00");
      return;
    }
    const val = parseFloat(amount.replace(',', '.'));
    if (isNaN(val)) return;

    const fromRate = fromAccount.currency_code === 'PLN' ? 1 : rates.find(r => r.code === fromAccount.currency_code)?.mid || 1;
    const toRate = toAccount.currency_code === 'PLN' ? 1 : rates.find(r => r.code === toAccount.currency_code)?.mid || 1;

    const converted = (val * fromRate) / toRate;
    setResult(converted.toFixed(2));
  }, [amount, fromAccount, toAccount, rates]);

  const selectAccount = (setter: (acc: any) => void) => {
    Alert.alert(
      "Select Account",
      "Available funds:",
      accounts.map(acc => ({
        text: `${acc.currency_code} (${acc.balance.toFixed(2)})`,
        onPress: () => setter(acc)
      })).concat([{ text: "Cancel", style: "cancel" }] as any)
    );
  };

  const handleExchange = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    const numResult = parseFloat(result);

    if (!fromAccount || !toAccount || isNaN(numAmount)) return;
    
    if (fromAccount.currency_code === toAccount.currency_code) {
      Alert.alert("Error", "Select different currencies");
      return;
    }

    if (numAmount > fromAccount.balance) {
      Alert.alert("Error", "Insufficient funds");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      // 1. Списание
      if (fromAccount.is_main) {
        await supabase.from("profiles").update({ balance: fromAccount.balance - numAmount }).eq("user_id", user.id);
      } else {
        await supabase.from("wallets").update({ balance: fromAccount.balance - numAmount }).eq("id", fromAccount.id);
      }

      // 2. Зачисление
      if (toAccount.is_main) {
        await supabase.from("profiles").update({ balance: toAccount.balance + numResult }).eq("user_id", user.id);
      } else {
        await supabase.from("wallets").update({ balance: toAccount.balance + numResult }).eq("id", toAccount.id);
      }

      // --- ШАГ 2: ЗАПИСЬ В ИСТОРИЮ ТРАНЗАКЦИЙ ---
      await supabase.from("transactions").insert({
        user_id: user.id,
        from_currency: fromAccount.currency_code,
        to_currency: toAccount.currency_code,
        from_amount: numAmount,
        to_amount: numResult,
        rate: numResult / numAmount
      });
      // ------------------------------------------

      Alert.alert("Success", "Currency exchanged successfully!", [
        { 
          text: "OK", 
          onPress: () => {
            setAmount(""); // Чистим ввод
            refreshBalances(); // Обновляем балансы на экране
          } 
        }
      ]);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen padded>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text variant="title" weight="700" style={{ marginBottom: 20 }}>Exchange</Text>

        {/* FROM SECTION */}
        <Card padding="md" style={styles.card}>
          <Text variant="caption" color="muted" weight="600" style={{ marginBottom: 8 }}>FROM</Text>
          <View style={styles.row}>
            <Input
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              containerStyle={{ flex: 1 }}
              style={{ borderWidth: 0, fontSize: 24, fontWeight: '700' }}
            />
            <Button 
              title={fromAccount?.currency_code || "PLN"}
              variant="outline"
              onPress={() => selectAccount(setFromAccount)}
              style={{ height: 40, paddingHorizontal: 12 }}
            />
          </View>
          <Text variant="caption" color="muted" style={{ marginTop: 8 }}>
            Balance: {fromAccount?.balance?.toFixed(2)} {fromAccount?.currency_code}
          </Text>
        </Card>

        {/* SWAP ICON */}
        <View style={{ alignItems: 'center', marginVertical: -15, zIndex: 10 }}>
          <Button
            variant="primary"
            onPress={() => {
              const temp = fromAccount;
              setFromAccount(toAccount);
              setToAccount(temp);
            }}
            style={{ width: 44, height: 44, borderRadius: 22, paddingHorizontal: 0 }}
          >
            <Icon name="exchange" size={16} color="primary" />
          </Button>
        </View>

        {/* TO SECTION */}
        <Card padding="md" style={styles.card}>
          <Text variant="caption" color="muted" weight="600" style={{ marginBottom: 8 }}>TO</Text>
          <View style={styles.row}>
            <Text style={[styles.input, { flex: 1, paddingLeft: 14 }]}>{result}</Text>
            <Button 
              title={toAccount?.currency_code || "Select"}
              variant="outline"
              onPress={() => selectAccount(setToAccount)}
              style={{ height: 40, paddingHorizontal: 12 }}
            />
          </View>
          <Text variant="caption" color="muted" style={{ marginTop: 8 }}>
            Balance: {toAccount?.balance?.toFixed(2)} {toAccount?.currency_code}
          </Text>
        </Card>

        {/* INFO BOX */}
        <Card padding="md" style={{ backgroundColor: theme.colors.inputBg, borderStyle: 'dashed' }}>
          <View style={styles.row}>
            <Text variant="caption" color="muted">Exchange Rate</Text>
            <Text variant="caption" weight="700">
               1 {fromAccount?.currency_code} ≈ {((parseFloat(result) || 0) / (parseFloat(amount) || 1)).toFixed(4)} {toAccount?.currency_code}
            </Text>
          </View>
        </Card>

        <Button 
          title="Confirm Exchange"
          onPress={handleExchange}
          loading={loading}
          disabled={!amount || parseFloat(amount) <= 0}
          fullWidth
          style={{ marginTop: 30 }}
        />
      </ScrollView>
    </Screen>
  );
}