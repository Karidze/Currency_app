import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { supabase } from "../../lib/supabase";
import { Screen, Text, Card, Icon } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

export default function HistoryScreen() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const { theme } = useTheme();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Card padding="md" style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ 
        width: 40, height: 40, borderRadius: 20, 
        backgroundColor: theme.colors.primary + '20', 
        justifyContent: 'center', alignItems: 'center', marginRight: 12 
      }}>
        <Icon name="exchange" size={18} color="primary" />
      </View>
      
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text weight="700">{item.from_currency} → {item.to_currency}</Text>
          <Text weight="700" color="primary">+{item.to_amount.toFixed(2)} {item.to_currency}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          <Text variant="caption" color="muted">
            {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <Text variant="caption" color="muted">-{item.from_amount.toFixed(2)} {item.from_currency}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <Screen padded>
      <Text variant="title" weight="700" style={{ marginBottom: 20 }}>Transactions</Text>
      
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchHistory} tintColor={theme.colors.primary} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text color="muted">No transactions yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}