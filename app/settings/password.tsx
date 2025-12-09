import { useState } from 'react'
import { View, Text, TextInput, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import CommonStyles from '../../app/styles/CommonStyles'
import HeaderStyles from '../../app/styles/HeaderStyles'
import { supabase } from '../../lib/supabase'

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function save() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Получаем текущего пользователя
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        alert('Unable to fetch user: ' + userError?.message)
        return
      }

      // Проверяем текущий пароль через повторный вход
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
      })
      if (signInError) {
        alert('Current password is incorrect')
        return
      }

      // Обновляем пароль
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (updateError) {
        alert('Password update failed: ' + updateError.message)
        return
      }

      alert('Password updated successfully!')
      router.back()
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>Update Password</Text>
        </View>

        {/* Card with fields */}
        <View style={CommonStyles.card}>
          <Text style={CommonStyles.sectionTitle}>Change your password</Text>

          <Text style={CommonStyles.labelText}>Current Password</Text>
          <TextInput
            style={CommonStyles.input}
            placeholder="Enter current password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text style={CommonStyles.labelText}>New Password</Text>
          <TextInput
            style={CommonStyles.input}
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={CommonStyles.labelText}>Confirm New Password</Text>
          <TextInput
            style={CommonStyles.input}
            placeholder="Re-enter new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Actions */}
        <View style={CommonStyles.actions}>
          <Pressable
            style={[
              CommonStyles.buttonBase,
              CommonStyles.buttonPrimary,
              loading && { opacity: 0.6 }, // визуально блокируем
            ]}
            onPress={save}
            disabled={loading} // блокируем кнопку
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={CommonStyles.buttonPrimaryText}>Save</Text>
            )}
          </Pressable>
          <Pressable
            style={[CommonStyles.buttonBase, CommonStyles.buttonSecondary]}
            onPress={() => router.back()}
            disabled={loading} // блокируем Cancel тоже
          >
            <Text style={CommonStyles.buttonSecondaryText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </PageContainer>
  )
}
