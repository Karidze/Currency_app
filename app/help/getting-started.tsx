import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'

export default function GettingStartedScreen() {
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
          <Text style={HeaderStyles.title}>Getting Started</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>Welcome to Currency Exchange App</Text>
          <Text style={CommonStyles.smallText}>
            • Register with your email and create a secure password.{"\n"}
            • Complete your profile with personal details.{"\n"}
            • Verification is required before you can exchange or trade currencies.{"\n"}
            • Once verified, you’ll gain access to exchange, withdrawal, and trading features.{"\n"}
            • Explore the dashboard to monitor rates and manage your wallet.
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
