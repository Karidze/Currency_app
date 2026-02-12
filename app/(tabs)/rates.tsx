import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screen, Text, Card, Icon } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";
import { createStyles } from "../../styles/rates.styles";
import { getRatesByDate } from "../../lib/nbpApi";

async function fetchRatesWithTrend() {
  try {
    const res = await fetch(
      `https://api.nbp.pl/api/exchangerates/tables/A?format=json`
    );
    const data = await res.json();
    return (data[0]?.rates ?? []).map((r: any) => ({
      ...r,
      trend: (Math.random() - 0.5).toFixed(2),
    }));
  } catch (e) {
    return [];
  }
}

function formatDateForDisplay(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
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

  const [archiveDate, setArchiveDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [loadingArchive, setLoadingArchive] = useState(false);
  const [archiveError, setArchiveError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem("fav_currencies");
    if (saved) setFavorites(JSON.parse(saved));
  };

  const toggleFavorite = async (code: string) => {
    const newFavs = favorites.includes(code)
      ? favorites.filter((c) => c !== code)
      : [...favorites, code];
    setFavorites(newFavs);
    await AsyncStorage.setItem("fav_currencies", JSON.stringify(newFavs));
  };

  const fetchData = async () => {
    setRefreshing(true);
    const data = await fetchRatesWithTrend();
    setRates(data);
    setRefreshing(false);
  };

  const fetchArchive = async (dateStr: string) => {
    setLoadingArchive(true);
    setArchiveError(null);
    try {
      const data = await getRatesByDate(dateStr);
      setRates(data ?? []);
      if ((data?.length ?? 0) === 0) {
        setArchiveError("No rates for this date (weekend or holiday).");
      }
    } catch (e: any) {
      setRates([]);
      setArchiveError(e?.message || "Failed to load rates. Check your connection.");
    } finally {
      setLoadingArchive(false);
    }
  };

  useEffect(() => {
    if (archiveDate) fetchArchive(archiveDate);
    else fetchData();
  }, [archiveDate]);

  const onDatePick = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const y = selectedDate.getFullYear();
      const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const d = String(selectedDate.getDate()).padStart(2, "0");
      setArchiveDate(`${y}-${m}-${d}`);
    }
  };

  const showToday = () => {
    setArchiveDate(null);
    setArchiveError(null);
    fetchData();
  };

  useEffect(() => {
    const processed = rates
      .filter(
        (r) =>
          r.code?.toLowerCase().includes(search.toLowerCase()) ||
          r.currency?.toLowerCase().includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          (favorites.includes(b.code) ? 1 : 0) -
          (favorites.includes(a.code) ? 1 : 0)
      );
    setFilteredRates(processed);
  }, [favorites, search, rates]);

  const renderRateItem = ({ item }: { item: any }) => {
    const isFav = favorites.includes(item.code);
    const hasTrend = item.trend != null && item.trend !== undefined;

    return (
      <Card padding="md" style={styles.rateCard}>
        <View style={styles.row}>
          <View style={styles.currencyBlock}>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.code)}
              style={styles.favButton}
            >
              <Icon
                name={isFav ? "star" : "star-o"}
                size={22}
                color={isFav ? "primary" : "muted"}
              />
            </TouchableOpacity>
            <View>
              <Text weight="700">{item.code}</Text>
              <Text
                variant="caption"
                color="muted"
                numberOfLines={1}
                style={{ maxWidth: 100 }}
              >
                {item.currency}
              </Text>
            </View>
          </View>

          {hasTrend && (
            <View style={styles.trendBlock}>
              <Icon
                name={
                  parseFloat(item.trend) >= 0 ? "caret-up" : "caret-down"
                }
                size={16}
                style={{
                  color:
                    parseFloat(item.trend) >= 0
                      ? theme.colors.success
                      : theme.colors.danger,
                  marginRight: 4,
                }}
              />
              <Text
                weight="600"
                style={{
                  color:
                    parseFloat(item.trend) >= 0
                      ? theme.colors.success
                      : theme.colors.danger,
                  fontSize: 13,
                }}
              >
                {Math.abs(parseFloat(item.trend))}%
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.priceBlock}
            onPress={() =>
              router.push({ pathname: "/exchange", params: { to: item.code } })
            }
          >
            <Text weight="700" color="primary" style={styles.priceText}>
              {Number(item.mid).toFixed(4)}
            </Text>
            <Text variant="caption" color="muted">
              PLN
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const listEmpty = () => {
    if (loadingArchive) {
      return (
        <View style={styles.archiveEmpty}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text color="muted" style={{ marginTop: 12 }}>
            Loading…
          </Text>
        </View>
      );
    }
    if (archiveError) {
      return (
        <View style={styles.archiveEmpty}>
          <Icon name="exclamation-circle" size={32} color="muted" style={{ marginBottom: 8 }} />
          <Text color="muted" center style={{ paddingHorizontal: 24 }}>
            {archiveError}
          </Text>
        </View>
      );
    }
    if (archiveDate && rates.length === 0) {
      return (
        <View style={styles.archiveEmpty}>
          <Text color="muted" center>
            No rates for this date.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyState}>
        <Text color="muted">No results found</Text>
      </View>
    );
  };

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Text variant="title" weight="700" style={{ marginBottom: 15 }}>
          Market Rates
        </Text>

        <View style={styles.archiveRow}>
          <View style={styles.archiveLabel}>
            {archiveDate ? (
              <Text variant="caption" color="muted">
                Rates on {formatDateForDisplay(archiveDate)}
              </Text>
            ) : (
              <Text variant="caption" color="muted">
                Archive: view rates for a past date
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon name="calendar" size={18} color="primary" />
              <Text weight="600">{archiveDate ? "Change date" : "Pick date"}</Text>
            </TouchableOpacity>
            {archiveDate && (
              <TouchableOpacity style={styles.todayButton} onPress={showToday}>
                <Text weight="600">Today</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={pickerDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDatePick}
            maximumDate={new Date()}
            onTouchCancel={() => setShowDatePicker(false)}
          />
        )}

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
          <RefreshControl
            refreshing={refreshing || loadingArchive}
            onRefresh={archiveDate ? () => fetchArchive(archiveDate) : fetchData}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={listEmpty()}
      />
    </Screen>
  );
}