import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, RefreshControl, FlatList } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Screen, Text, Card, Icon } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "../../styles/rates.styles"; // Импорт стилей

async function fetchRatesWithTrend() {
  try {
    const res = await fetch(`http://api.nbp.pl/api/exchangerates/tables/A?format=json`);
    const data = await res.json();
    return data[0].rates.map((r: any) => ({
      ...r,
      trend: (Math.random() * 1 - 0.5).toFixed(2) 
    }));
  } catch (e) {
    return [];
  }
}

export default function RatesScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const [rates, setRates] = useState<any[]>([]);
  const [filteredRates, setFilteredRates] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFavorites();
    fetchData();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('fav_currencies');
    if (saved) setFavorites(JSON.parse(saved));
  };

  const toggleFavorite = async (code: string) => {
    let newFavs = favorites.includes(code) ? favorites.filter(c => c !== code) : [...favorites, code];
    setFavorites(newFavs);
    await AsyncStorage.setItem('fav_currencies', JSON.stringify(newFavs));
  };

  const fetchData = async () => {
    setRefreshing(true);
    const data = await fetchRatesWithTrend();
    setRates(data);
    setRefreshing(false);
  };

  useEffect(() => {
    const processed = rates
      .filter(r => r.code.toLowerCase().includes(search.toLowerCase()) || r.currency.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (favorites.includes(b.code) ? 1 : 0) - (favorites.includes(a.code) ? 1 : 0));
    setFilteredRates(processed);
  }, [favorites, search, rates]);

  const renderRateItem = ({ item }: { item: any }) => {
    const isFav = favorites.includes(item.code);
    const trendValue = parseFloat(item.trend);
    const isUp = trendValue >= 0;
    const trendColor = isUp ? theme.colors.success : theme.colors.danger;

    return (
      <Card padding="md" style={styles.rateCard}>
        <View style={styles.row}>
          <View style={styles.currencyBlock}>
            <TouchableOpacity onPress={() => toggleFavorite(item.code)} style={styles.favButton}>
              <Icon 
                name={isFav ? "star" : "star-o"} 
                size={22} 
                color={isFav ? "primary" : "muted"} 
              />
            </TouchableOpacity>
            <View>
              <Text weight="700">{item.code}</Text>
              <Text variant="caption" color="muted" numberOfLines={1} style={{ maxWidth: 100 }}>
                {item.currency}
              </Text>
            </View>
          </View>

          <View style={styles.trendBlock}>
            <Icon 
              name={isUp ? "caret-up" : "caret-down"} 
              size={16} 
              style={{ color: trendColor, marginRight: 4 }} 
            />
            <Text weight="600" style={{ color: trendColor, fontSize: 13 }}>
              {Math.abs(trendValue)}%
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.priceBlock}
            // ТУТ ИСПРАВИЛ: теперь передаем код валюты в параметры
            onPress={() => router.push({ pathname: "/exchange", params: { to: item.code } })}
          >
            <Text weight="700" color="primary" style={styles.priceText}>
              {item.mid.toFixed(4)}
            </Text>
            <Text variant="caption" color="muted">PLN</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Text variant="title" weight="700" style={{ marginBottom: 15 }}>Market Rates</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="muted" />
          <TextInput
            placeholder="Search currency..."
            placeholderTextColor={theme.colors.placeholder}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredRates}
        keyExtractor={(item) => item.code}
        renderItem={renderRateItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} tintColor={theme.colors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text color="muted">No results found</Text>
          </View>
        }
      />
    </Screen>
  );
}