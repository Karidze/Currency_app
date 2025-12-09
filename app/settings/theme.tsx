import { useState } from 'react'
import { View, Text, Switch, ScrollView, Pressable } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import CommonStyles from '../../app/styles/CommonStyles'
import HeaderStyles from '../../app/styles/HeaderStyles'

export default function ThemeSettings() {
  const [darkTheme, setDarkTheme] = useState(false)
  const router = useRouter()

  function save() {
    alert(`Theme saved: ${darkTheme ? 'Dark' : 'Light'}`)
    router.back()
  }

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>Theme</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.labelText}>Select Theme</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={CommonStyles.smallText}>{darkTheme ? 'Dark' : 'Light'}</Text>
            <Switch value={darkTheme} onValueChange={setDarkTheme} />
          </View>
        </View>

        <View style={CommonStyles.actions}>
          <Pressable style={[CommonStyles.buttonBase, CommonStyles.buttonPrimary]} onPress={save}>
            <Text style={CommonStyles.buttonPrimaryText}>Save</Text>
          </Pressable>
          <Pressable style={[CommonStyles.buttonBase, CommonStyles.buttonSecondary]} onPress={() => router.back()}>
            <Text style={CommonStyles.buttonSecondaryText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
