// app/settings/index.tsx
import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'
import AboutUsModal from '../../components/AboutUsModal'
import { useTheme } from '../../context/ThemeContext'

export default function SettingsMenu() {
  const router = useRouter()
  const { isDark } = useTheme()
  const CommonStyles = getCommonStyles(isDark)

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header with back arrow */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
          </Pressable>
          <Text style={HeaderStyles.title}>Settings</Text>
        </View>

        {/* Theme */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/theme')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="adjust" size={22} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={CommonStyles.itemLabel}>Theme</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color={isDark ? '#888' : '#ccc'} />
        </Pressable>

        {/* Contact Info */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/contact')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="address-card" size={22} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={CommonStyles.itemLabel}>Contact Information</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color={isDark ? '#888' : '#ccc'} />
        </Pressable>

        {/* Password */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/password')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="lock" size={22} color={isDark ? '#0A84FF' : '#007AFF'} />
            <Text style={CommonStyles.itemLabel}>Password</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color={isDark ? '#888' : '#ccc'} />
        </Pressable>

        {/* About the App → поп‑ап */}
        <AboutUsModal />
      </ScrollView>
    </PageContainer>
  )
}
