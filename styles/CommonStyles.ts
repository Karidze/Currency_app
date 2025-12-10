// app/styles/CommonStyles.ts
import { StyleSheet } from 'react-native'
import { lightTheme, darkTheme } from './ThemesStyle'

export function getCommonStyles(isDark: boolean) {
  const colors = isDark ? darkTheme : lightTheme

  return StyleSheet.create({
    containerPadding: {
      paddingVertical: 5,
      paddingHorizontal: 5,
      backgroundColor: colors.background,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 8,
    },

    labelText: {
      fontSize: 15,
      color: colors.secondaryText,
      fontWeight: "500",
    },
    smallText: {
      fontSize: 14,
      color: colors.secondaryText,
    },
    itemLabel: {
      fontSize: 17,
      fontWeight: "500",
      color: colors.text,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 2,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.inputBg,
      color: colors.text,
    },

    actions: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    buttonBase: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonPrimary: {
      backgroundColor: colors.primary,
    },
    buttonPrimaryText: {
      color: '#fff',
      fontWeight: "600",
      fontSize: 16,
    },
    buttonSecondary: {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    buttonSecondaryText: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: 16,
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      width: '85%',
      gap: 12,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.primary,
      marginBottom: 8,
    },
    modalText: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    closeBtn: {
      marginTop: 12,
      alignSelf: 'flex-end',
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    closeText: {
      color: '#fff',
      fontWeight: "600",
    },
  })
}
