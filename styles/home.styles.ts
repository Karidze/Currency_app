// app/(tabs)/home.styles.ts
import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const createStyles = (theme: any) => StyleSheet.create({
  scrollContent: { paddingBottom: 100 },
  header: { padding: 20 },
  actionGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingHorizontal: 20, 
    marginBottom: 30 
  },
  actionItem: { alignItems: 'center' },
  iconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  section: { marginBottom: 20 },
  sectionTitle: { marginLeft: 20, marginBottom: 15 },
  assetsList: { paddingLeft: 20, paddingRight: 10 },
  assetCard: { marginRight: 12, minWidth: 120, padding: 16 },
  rateRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  rateInfo: { gap: 4 },
  
  // СТИЛИ ДЛЯ МОДАЛКИ
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalOverlayTouch: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: height * 0.7, // 70% экрана
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  currencyCode: {
    width: 60,
    fontWeight: '700',
    fontSize: 16,
  },
  topUpHint: { marginBottom: theme.spacing.sm },
  topUpInputWrap: { marginBottom: theme.spacing.md },
  topUpButton: { marginTop: theme.spacing.sm },
});