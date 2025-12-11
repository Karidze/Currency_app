import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'

export default function ExchangeScreen() {
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
          <Text style={HeaderStyles.title}>Currency Exchange</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>How to Exchange Currency</Text>
          <Text style={CommonStyles.smallText}>
            • Navigate to the Exchange tab.{"\n"}
            • Select the currency you want to sell and the currency you want to buy.{"\n"}
            • Enter the amount and check the live exchange rate.{"\n"}
            • Confirm the transaction — your wallet will update instantly.{"\n"}
            • Verified users can access higher limits and faster processing.
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
