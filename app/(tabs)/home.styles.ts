// app/(tabs)/home.styles.ts
import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => StyleSheet.create({
  scrollContent: { paddingBottom: 40 },
  header: { padding: 20 },
  actionGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 25,
    marginBottom: 20
  },
  actionItem: { alignItems: 'center' },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: { marginTop: 10, marginBottom: 20 },
  sectionTitle: { paddingHorizontal: 20, marginBottom: 12 },
  assetsList: { paddingHorizontal: 20, gap: 12, paddingBottom: 10 },
  assetCard: { width: 160, padding: 12, marginRight: 8 },
  // Новая кнопка под списком
  openAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.inputBg,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary,
  },
  hashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginTop: 8,
  },
  hashText: {
    fontSize: 9,
    color: '#666',
    fontFamily: 'monospace',
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  rateInfo: { gap: 2 },
});