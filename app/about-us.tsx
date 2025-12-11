import { View, Text, Pressable, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { getCommonStyles } from '../styles/CommonStyles'   // ✅ правильный импорт
import HeaderStyles from '../styles/HeaderStyles'
import { useRouter, Stack } from 'expo-router'
import AboutUsModal from '../components/AboutUsModal'
import { useTheme } from '../context/ThemeContext'         // ✅ подключаем тему

export default function AboutUsScreen() {
  const router = useRouter()
  const { isDark } = useTheme()
  const CommonStyles = getCommonStyles(isDark)             // ✅ получаем стили по теме

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header row with back arrow */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
          </Pressable>
          <Text style={HeaderStyles.title}>About Us</Text>
        </View>

        {/* Вставляем переиспользуемый компонент */}
        <AboutUsModal />
      </ScrollView>
    </PageContainer>
  )
}
