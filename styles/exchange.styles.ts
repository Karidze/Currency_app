//app/(tabs)/exchange.styles.ts

import { StyleSheet } from "react-native";
import { Theme } from "../constants/theme";

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  card: {
    marginBottom: 10,
    zIndex: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    borderWidth: 0,
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    paddingLeft: 0,
  },
  selectorButton: {
    height: 40,
    paddingHorizontal: 12,
    minWidth: 100,
    justifyContent: 'space-between',
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: -18,
    zIndex: 10,
  },
  swapButton: {
    backgroundColor: theme.colors.primary, // Основной цвет приложения
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.background, // Создает визуальный разрыв между карточками
    // Тени для объема
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resultContainer: {
    flex: 1,
    paddingLeft: 14,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
  },
  balanceText: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  accountOptionInfo: {
    gap: 4,
  },
});