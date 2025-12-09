import { View, Text, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import CommonStyles from '../../app/styles/CommonStyles'
import HeaderStyles from '../../app/styles/HeaderStyles'
import AboutUsModal from '../../components/AboutUsModal'   // ✅ подключаем поп‑ап

export default function SettingsMenu() {
  const router = useRouter()

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header with back arrow */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>Settings</Text>
        </View>

        {/* Theme */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/theme')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="adjust" size={22} color="#007AFF" />
            <Text style={CommonStyles.itemLabel}>Theme</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color="#ccc" />
        </Pressable>

        {/* Contact Info */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/contact')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="address-card" size={22} color="#007AFF" />
            <Text style={CommonStyles.itemLabel}>Contact Information</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color="#ccc" />
        </Pressable>

        {/* Password */}
        <Pressable style={CommonStyles.itemRow} onPress={() => router.push('/settings/password')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="lock" size={22} color="#007AFF" />
            <Text style={CommonStyles.itemLabel}>Password</Text>
          </View>
          <FontAwesome name="angle-right" size={22} color="#ccc" />
        </Pressable>

        {/* About the App → теперь поп‑ап */}
        <AboutUsModal />
      </ScrollView>
    </PageContainer>
  )
}
