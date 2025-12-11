import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'

export default function ContactScreen() {
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
          <Text style={HeaderStyles.title}>Contact Us</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>Get in Touch</Text>
          <Text style={CommonStyles.smallText}>
            • Use the in-app chat for quick support.{"\n"}
            • Email us at support@flowRate.com for detailed inquiries.{"\n"}
            • Check the FAQ section for common issues.{"\n"}
            • Our support team is available 24/7 to assist verified users.
          </Text>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
