import { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import CommonStyles from '../../app/styles/CommonStyles'
import HeaderStyles from '../../app/styles/HeaderStyles'

export default function ContactSettings() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [zipCode, setZipCode] = useState('')
  const router = useRouter()

  function save() {
    alert(`Saved:\n${email}, ${phone}, ${address1}, ${address2}, ${zipCode}`)
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
          <Text style={HeaderStyles.title}>Contact Information</Text>
        </View>

        <View style={CommonStyles.card}>
          <Text style={CommonStyles.labelText}>Email</Text>
          <TextInput style={CommonStyles.input} value={email} onChangeText={setEmail} />

          <Text style={CommonStyles.labelText}>Phone</Text>
          <TextInput style={CommonStyles.input} value={phone} onChangeText={setPhone} />

          <Text style={CommonStyles.labelText}>Address line 1</Text>
          <TextInput style={CommonStyles.input} value={address1} onChangeText={setAddress1} />

          <Text style={CommonStyles.labelText}>Address line 2</Text>
          <TextInput style={CommonStyles.input} value={address2} onChangeText={setAddress2} />

          <Text style={CommonStyles.labelText}>ZIP Code</Text>
          <TextInput style={CommonStyles.input} value={zipCode} onChangeText={setZipCode} />
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
