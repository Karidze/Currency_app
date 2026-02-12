import { StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.inputBg,
      borderRadius: 16,
      paddingHorizontal: 15,
    },
    searchInput: {
      flex: 1,
      padding: 12,
      color: theme.colors.text,
      fontSize: 16,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    rateCard: {
      marginBottom: 10,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    currencyBlock: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    favButton: {
      marginRight: 12,
    },
    trendBlock: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
    },
    trendText: {
      fontSize: 13,
    },
    priceBlock: {
      alignItems: "flex-end",
      minWidth: 80,
    },
    priceText: {
      fontSize: 16,
    },
    emptyState: {
      marginTop: 50,
      alignItems: "center",
    },
  });