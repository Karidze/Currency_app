import { useRouter } from "expo-router";
import { useEffect, useState, useCallback} from "react";
import { 
  ScrollView, View, TouchableOpacity, RefreshControl, 
  Alert, Modal, TouchableWithoutFeedback 
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import { getTopRates } from "../../lib/nbpApi";
import { supabase } from "../../lib/supabase";
import { Card, Icon, Screen, Text, Button } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "../../styles/home.styles";
import { generateAccountNumber } from "../../lib/utils";
import { useFocusEffect } from "expo-router"; 

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", EUR: "€", GBP: "£", PLN: "zł ", UAH: "₴", TRY: "₺", CHF: "Fr",
};

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [rates, setRates] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeWallet, setActiveWallet] = useState<any>(null);
  
  // Состояние для модалки
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      
      // Это сработает каждый раз, когда юзер нажимает на вкладку "Home"
      // или возвращается сюда после логина
      return () => {
        // Тут можно что-то почистить при уходе с экрана, если нужно
      };
    }, [])
  );

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      if (authUser) {
        let { data: profileData } = await supabase.from("profiles").select("*").eq("user_id", authUser.id).single();
        
        if (profileData && !profileData.account_number) {
          const newAcc = generateAccountNumber();
          await supabase.from("profiles").update({ account_number: newAcc }).eq("user_id", authUser.id);
          profileData.account_number = newAcc;
        }
        setProfile(profileData);

        const { data: walletData } = await supabase.from("wallets").select("*").eq("user_id", authUser.id);
        setWallets(walletData || []);
        
        if (activeWallet) {
          const updated = walletData?.find(w => w.id === activeWallet.id);
          if (updated) setActiveWallet(updated);
        }
      }
      
      const topRates = await getTopRates();
      setRates(topRates);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setRefreshing(false); 
    }
  };

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Account number copied to clipboard.");
  };

  // Функция открытия кошелька
  const createWallet = async (currencyCode: string) => {
    setModalVisible(false);
    const { error } = await supabase.from("wallets").insert({
      user_id: user.id, 
      currency_code: currencyCode, 
      balance: 0, 
      account_number: generateAccountNumber()
    });
    
    if (error) Alert.alert("Error", "Could not open wallet");
    else fetchData();
  };

  const existingCodes = wallets.map(w => w.currency_code);
  const availableToOpen = rates.filter(r => !existingCodes.includes(r.code) && r.code !== 'PLN');

  const displayCurrency = activeWallet ? activeWallet.currency_code : "PLN";
  const displayBalance = activeWallet ? activeWallet.balance : profile?.balance;
  const displayAccount = activeWallet ? activeWallet.account_number : profile?.account_number;

  return (
    <Screen padded={false}>
      {/* МОДАЛЬНОЕ ОКНО ВЫБОРА ВАЛЮТЫ */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        presentationStyle="overFullScreen"
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* 1. Нажимаемая область сверху для закрытия */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          {/* 2. Контентная часть */}
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="subtitle" weight="700">Select Currency</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon name="times" size={20} color="text" />
              </TouchableOpacity>
            </View>
            
            {/* ScrollView должен быть внутри обычного View, а не под TouchableWithoutFeedback напрямую */}
            <ScrollView 
              showsVerticalScrollIndicator={true} 
              style={{ flexGrow: 0 }} // Важно, чтобы скролл не пытался занять бесконечность
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {availableToOpen.length > 0 ? (
                availableToOpen.map((rate) => (
                  <TouchableOpacity 
                    key={rate.code} 
                    style={styles.currencyOption}
                    onPress={() => createWallet(rate.code)}
                  >
                    <Text style={[styles.currencyCode, { color: theme.colors.primary }]}>{rate.code}</Text>
                    <Text style={{ flex: 1 }}>{rate.currency}</Text>
                    <Icon name="plus" size={14} color="muted" />
                  </TouchableOpacity>
                ))
              ) : (
                <Text center color="muted" style={{ padding: 20 }}>No more currencies available</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} tintColor={theme.colors.primary} />}
      >
        {user ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setActiveWallet(null)}>
                <Card padding="lg" style={{ backgroundColor: theme.colors.primary, borderRadius: 24 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View>
                      <Text weight="600" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {activeWallet ? `${displayCurrency} Account` : "Main Balance (PLN)"}
                      </Text>
                      <Text variant="title" weight="700" style={{ color: 'white', fontSize: 36, marginTop: 4 }}>
                        {CURRENCY_SYMBOLS[displayCurrency] || ""}{Number(displayBalance || 0).toFixed(2)}
                      </Text>
                    </View>
                    <Icon name={activeWallet ? "credit-card" : "shield"} size={28} color="text" />
                  </View>

                  <TouchableOpacity 
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    onPress={() => copyToClipboard(displayAccount)}
                  >
                    <View>
                      <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>Account Number</Text>
                      <Text style={{ color: 'white', fontSize: 15, fontFamily: 'monospace' }}>
                        {displayAccount || "Generating..."}
                      </Text>
                    </View>
                    <Icon name="copy" size={16} color="text" />
                  </TouchableOpacity>
                </Card>
              </TouchableOpacity>
            </View>

            <View style={styles.actionGrid}>
              <QuickAction title="Exchange" icon="exchange" onPress={() => router.push("/exchange")} />
              <QuickAction title="New Wallet" icon="plus-circle" onPress={() => setModalVisible(true)} />
              <QuickAction title="History" icon="history" onPress={() => router.push("/history")} />
            </View>

            <View style={styles.section}>
              <Text variant="subtitle" weight="700" style={styles.sectionTitle}>My Assets</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.assetsList}>
                <AssetCard 
                    code="PLN" 
                    amount={Number(profile?.balance || 0).toFixed(2)} 
                    symbol="zł" 
                    isActive={!activeWallet}
                    onPress={() => setActiveWallet(null)}
                />

                {wallets.map((wallet) => (
                  <AssetCard 
                    key={wallet.id}
                    code={wallet.currency_code} 
                    amount={Number(wallet.balance).toFixed(2)} 
                    symbol={CURRENCY_SYMBOLS[wallet.currency_code] || ""} 
                    isActive={activeWallet?.id === wallet.id}
                    onPress={() => setActiveWallet(wallet)}
                  />
                ))}
              </ScrollView>
            </View>
          </>
        ) : (
          // --- КОНТЕНТ ДЛЯ ГОСТЯ ---
          <View style={{ padding: 20, paddingTop: 40 }}>
            <Card padding="lg" style={{ alignItems: 'center', borderStyle: 'dashed' }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.inputBg, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Icon name="user" size={40} color="muted" />
              </View>
              <Text variant="subtitle" weight="700" center>Personal Finance Tracker</Text>
              <Text color="muted" center style={{ marginTop: 8, marginBottom: 24 }}>
                Log in to manage your balances, open multi-currency wallets and exchange money instantly.
              </Text>
              <Button 
                title="Login or Register" 
                fullWidth 
                onPress={() => router.push("/profile")} 
              />
            </Card>
          </View>
        )}

        {/* --- ОБЩИЙ КОНТЕНТ (КУРСЫ) --- */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 }}>
            <Text variant="subtitle" weight="700" style={styles.sectionTitle}>Market Rates</Text>
            <Text variant="caption" color="muted">NBP Bank</Text>
          </View>
          <Card padding="none" style={{ marginHorizontal: 20, marginBottom: 20 }}>
            {rates.map((item, index) => (
              <View key={item.code} style={[styles.rateRow, index === rates.length - 1 ? { borderBottomWidth: 0 } : { borderBottomColor: theme.colors.border }]}>
                <View style={styles.rateInfo}>
                  <Text weight="600">{item.code}</Text>
                  <Text variant="caption" color="muted">{item.currency}</Text>
                </View>
                <Text weight="700" color="primary">{Number(item.mid).toFixed(4)} PLN</Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
}

function AssetCard({ code, amount, symbol, isActive, onPress }: any) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={[
          styles.assetCard, 
          isActive && { borderColor: theme.colors.primary, borderWidth: 2 }
      ]}>
        <Text variant="caption" weight="700" color={isActive ? "primary" : "muted"}>{code}</Text>
        <Text weight="700" style={{ fontSize: 18 }}>{symbol}{amount}</Text>
        {isActive && (
           <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.primary }} />
              <Text style={{ fontSize: 8, color: theme.colors.primary, marginLeft: 4 }}>Active</Text>
           </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

function QuickAction({ title, icon, onPress }: any) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionItem} activeOpacity={0.6}>
      <View style={[styles.iconCircle, { backgroundColor: theme.colors.inputBg }]}>
        <Icon name={icon} size={22} color="primary" />
      </View>
      <Text variant="caption" weight="600" style={{ marginTop: 8 }}>{title}</Text>
    </TouchableOpacity>
  );
}