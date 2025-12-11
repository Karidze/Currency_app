import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'

export default function PrivacyScreen() {
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
          <Text style={HeaderStyles.title}>Privacy</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>Your Privacy Matters</Text>
          <Text style={CommonStyles.smallText}>
            • All user data is encrypted and stored securely.{"\n"}
            • Verification documents are used only for compliance and never shared with third parties.{"\n"}
            • We follow strict financial regulations to protect your identity.{"\n"}
            • Review our Privacy Policy regularly for updates.{"\n"}
            • You control your account and can request data deletion anytime.
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
