import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";
import { getTopRates } from "../../lib/nbpApi";
import { Screen, Text, Card, Icon, Button, Input } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "../../styles/exchange.styles";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router"; 

export default function ExchangeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  
  const [fromAccount, setFromAccount] = useState<any>(null);
  const [toAccount, setToAccount] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("0.00");

  // Состояние модалки
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeSetter, setActiveSetter] = useState<((acc: any) => void) | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Вызываем загрузку данных каждый раз, когда экран в фокусе
    }, [])
  );

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;
      const { data: profile } = await supabase.from("profiles").select("balance").eq("user_id", userId).single();
      const { data: wallets } = await supabase.from("wallets").select("*").eq("user_id", userId);
      
      const allAccounts = [
        { id: 'main', currency_code: 'PLN', balance: profile?.balance || 0, is_main: true },
        ...(wallets || []).map(w => ({ ...w, is_main: false }))
      ];
      
      setAccounts(allAccounts);
      const marketRates = await getTopRates();
      setRates(marketRates);

      if (params.to) {
        const foundFrom = allAccounts.find(a => a.currency_code === 'PLN');
        const foundTo = allAccounts.find(a => a.currency_code === params.to);
        setFromAccount(foundFrom || allAccounts[0]);
        setToAccount(foundTo || (allAccounts.length > 1 ? allAccounts[1] : null));
      } else {
        setFromAccount(allAccounts[0]);
        if (allAccounts.length > 1) setToAccount(allAccounts[1]);
      }
    } catch (e) {
      console.error(e);
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

    setResult(((val * fromRate) / toRate).toFixed(2));
  }, [amount, fromAccount, toAccount, rates]);

  const openAccountSelector = (setter: (acc: any) => void) => {
    setActiveSetter(() => setter);
    setModalVisible(true);
  };

  const handleSelectAccount = (acc: any) => {
    if (activeSetter) activeSetter(acc);
    setModalVisible(false);
    setActiveSetter(null);
  };

  const handleExchange = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'));
    const numResult = parseFloat(result);

    if (isNaN(numAmount) || numAmount <= 0) return;
    if (numAmount > fromAccount.balance) {
      Alert.alert("Error", "Insufficient funds");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error();

      if (fromAccount.is_main) {
        await supabase.from("profiles").update({ balance: fromAccount.balance - numAmount }).eq("user_id", user.id);
      } else {
        await supabase.from("wallets").update({ balance: fromAccount.balance - numAmount }).eq("id", fromAccount.id);
      }

      if (toAccount.is_main) {
        await supabase.from("profiles").update({ balance: toAccount.balance + numResult }).eq("user_id", user.id);
      } else {
        await supabase.from("wallets").update({ balance: toAccount.balance + numResult }).eq("id", toAccount.id);
      }

      await supabase.from("transactions").insert({
        user_id: user.id,
        from_currency: fromAccount.currency_code,
        to_currency: toAccount.currency_code,
        from_amount: numAmount,
        to_amount: numResult,
        rate: numResult / numAmount
      });

      Alert.alert("Success", "Exchange completed!", [{ text: "OK", onPress: () => {
        setAmount("");
        fetchData();
      }}]);
    } catch (e) {
      Alert.alert("Error", "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen padded>
      {/* МОДАЛКА ВЫБОРА АККАУНТА */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        presentationStyle="overFullScreen"
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="subtitle" weight="700">Select Account</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} hitSlop={15}>
                <Icon name="times" size={20} color="muted" />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={true} style={{ flexGrow: 0 }}>
              {accounts.map((acc) => (
                <TouchableOpacity 
                  key={acc.id} 
                  style={styles.accountOption}
                  onPress={() => handleSelectAccount(acc)}
                >
                  <View style={styles.accountOptionInfo}>
                    <Text weight="700" style={{ fontSize: 16 }}>{acc.currency_code}</Text>
                    <Text variant="caption" color="muted">
                      Balance: {acc.balance.toFixed(2)}
                    </Text>
                  </View>
                  {(fromAccount?.id === acc.id || toAccount?.id === acc.id) && (
                    <Icon name="check" size={16} color="primary" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text variant="title" weight="700" style={{ marginBottom: 20 }}>Exchange</Text>

        <Card padding="md" style={styles.card}>
          <Text variant="caption" color="muted" weight="600">SEND FROM</Text>
          <View style={styles.row}>
            <Input
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              containerStyle={{ flex: 1 }}
              style={styles.input}
            />
            <Button variant="outline" onPress={() => openAccountSelector(setFromAccount)} style={styles.selectorButton}>
              <Text weight="700" color="primary">{fromAccount?.currency_code || "PLN"}</Text>
              <Icon name="chevron-down" size={12} color="primary" />
            </Button>
          </View>
          <Text variant="caption" color="muted" style={styles.balanceText}>
            Balance: {fromAccount?.balance?.toFixed(2)} {fromAccount?.currency_code}
          </Text>
        </Card>

        <View style={styles.swapContainer}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => {
              const temp = fromAccount;
              setFromAccount(toAccount);
              setToAccount(temp);
            }}
            style={styles.swapButton}
          >
            {/* Здесь меняем name на "exchange", если это нужная иконка, 
                или на ту, которую ты используешь в табах (например "repeat" или "swap") */}
            <Icon name="exchange" size={20} color="white" style={{ transform: [{ rotate: '90deg' }] }} /> 
          </TouchableOpacity>
        </View>

        <Card padding="md" style={styles.card}>
          <Text variant="caption" color="muted" weight="600">RECEIVE TO</Text>
          <View style={styles.row}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            <Button variant="outline" onPress={() => openAccountSelector(setToAccount)} style={styles.selectorButton}>
              <Text weight="700" color="primary">{toAccount?.currency_code || "Select"}</Text>
              <Icon name="chevron-down" size={12} color="primary" />
            </Button>
          </View>
          <Text variant="caption" color="muted" style={styles.balanceText}>
            Balance: {toAccount?.balance?.toFixed(2)} {toAccount?.currency_code}
          </Text>
        </Card>

        <Button 
          title="Confirm Transaction" 
          onPress={handleExchange}
          loading={loading}
          disabled={!amount || parseFloat(amount) <= 0 || fromAccount?.id === toAccount?.id}
          fullWidth 
          style={{ marginTop: 30 }} 
        />
      </ScrollView>
    </Screen>
  );
}