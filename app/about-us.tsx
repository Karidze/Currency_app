import { View, Text, Pressable, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import CommonStyles from '../app/styles/CommonStyles'
import HeaderStyles from '../app/styles/HeaderStyles'
import { useRouter, Stack } from 'expo-router'
import AboutUsModal from '../components/AboutUsModal'

export default function AboutUsScreen() {
  const router = useRouter()

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header row with back arrow */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>About Us</Text>
        </View>

        {/* Вставляем переиспользуемый компонент */}
        <AboutUsModal />
      </ScrollView>
    </PageContainer>
  )
}
