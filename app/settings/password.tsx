import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
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

  // 👁 отдельные стейты для каждого поля
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const router = useRouter()

  function getPasswordStrength(password: string) {
    let score = 0
    if (password.length >= 6) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 1) return { label: 'Weak', color: 'red', progress: 0.33 }
    if (score === 2) return { label: 'Medium', color: 'orange', progress: 0.66 }
    return { label: 'Strong', color: 'green', progress: 1 }
  }

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
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        alert('Unable to fetch user: ' + userError?.message)
        return
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
      })
      if (signInError) {
        alert('Current password is incorrect')
        return
      }

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

  function renderPasswordField(
    label: string,
    value: string,
    setter: (v: string) => void,
    placeholder: string,
    show: boolean,
    toggleShow: () => void
  ) {
    return (
      <View style={{ marginBottom: 16 }}>
        <Text style={CommonStyles.labelText}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputWithIcon}
            placeholder={placeholder}
            secureTextEntry={!show}
            value={value}
            onChangeText={setter}
          />
          <Pressable style={styles.eyeButton} onPress={toggleShow}>
            <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={20} color="#007AFF" />
          </Pressable>
        </View>
      </View>
    )
  }

  const strength = getPasswordStrength(newPassword)

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
          {/* Header */}
          <View style={HeaderStyles.headerRow}>
            <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
            </Pressable>
            <Text style={HeaderStyles.title}>Update Password</Text>
          </View>

          {/* Card */}
          <View style={CommonStyles.card}>
            <Text style={CommonStyles.sectionTitle}>Change your password</Text>

            {renderPasswordField('Current Password', currentPassword, setCurrentPassword, 'Enter current password', showCurrent, () => setShowCurrent(!showCurrent))}
            {renderPasswordField('New Password', newPassword, setNewPassword, 'Enter new password', showNew, () => setShowNew(!showNew))}

            {/* Progress bar силы пароля */}
            {newPassword.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${strength.progress * 100}%`, backgroundColor: strength.color },
                    ]}
                  />
                </View>
                <Text style={{ color: strength.color, marginTop: 4 }}>{strength.label}</Text>
              </View>
            )}

            {renderPasswordField('Confirm New Password', confirmPassword, setConfirmPassword, 'Re-enter new password', showConfirm, () => setShowConfirm(!showConfirm))}
          </View>

          {/* Actions */}
          <View style={CommonStyles.actions}>
            <Pressable
              style={[
                CommonStyles.buttonBase,
                CommonStyles.buttonPrimary,
                loading && { opacity: 0.6 },
              ]}
              onPress={save}
              disabled={loading}
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
              disabled={loading}
            >
              <Text style={CommonStyles.buttonSecondaryText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    ...CommonStyles.input,
    paddingRight: 40, // место для иконки
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E6EAF2',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
})
