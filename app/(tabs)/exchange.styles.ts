import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => StyleSheet.create({
  container: { padding: 20 },
  card: { marginBottom: 16 },
  label: { marginBottom: 8, opacity: 0.6 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  input: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: theme.colors.text,
    flex: 1
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  divider: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -10,
    zIndex: 1
  },
  infoBox: {
    backgroundColor: theme.colors.inputBg,
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    gap: 8
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20
  }
});