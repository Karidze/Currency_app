// app/help/withdraw.tsx
import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'

export default function WithdrawScreen() {
  const router = useRouter()
  const { isDark } = useTheme()
  const CommonStyles = getCommonStyles(isDark)

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
          </Pressable>
          <Text style={HeaderStyles.title}>Withdraw Funds</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>Steps to Withdraw</Text>
          <Text style={CommonStyles.smallText}>
            • Go to the Wallet section.{"\n"}
            • Choose “Withdraw” and select your preferred method (bank account or card).{"\n"}
            • Enter the amount and confirm.{"\n"}
            • Processing times vary depending on your bank.{"\n"}
            • Verification ensures secure withdrawals and prevents fraud.
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
