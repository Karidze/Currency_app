import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import PageContainer from '../components/PageContainer'
import { useRouter } from 'expo-router'
import { useAvatar } from '../hooks/useAvatar'
import AvatarWithCamera from '../components/AvatarWithCamera'
import CommonStyles from '../app/styles/CommonStyles'
import styles from '../app/styles/EditProfileStyles'

const GENDER_OPTIONS = ['male', 'female', 'other'] as const
type Gender = typeof GENDER_OPTIONS[number]

function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<any>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState<Gender>('other')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [country, setCountry] = useState('')
  const [showDOBPicker, setShowDOBPicker] = useState(false)
  const [dobTemp, setDobTemp] = useState<Date | undefined>(undefined)

  const router = useRouter()
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const userId = data?.user?.id
      if (userId) {
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single()
          .then(({ data }) => {
            if (data) {
              setProfile(data)
              setFirstName(data.first_name || '')
              setLastName(data.last_name || '')
              const g = (data.gender || '').toLowerCase()
              setGender(GENDER_OPTIONS.includes(g as Gender) ? (g as Gender) : 'other')
              setDateOfBirth(data.date_of_birth || '')
              setCountry(data.country || '')
              setPhoto(data.photo || '')
              if (data.date_of_birth) {
                const parts = String(data.date_of_birth).split('-').map(Number)
                if (parts.length === 3 && !Number.isNaN(parts[0])) {
                  setDobTemp(new Date(parts[0], parts[1] - 1, parts[2]))
                }
              }
            }
          })
      }
    })
  }, [setPhoto])

  async function saveProfile() {
    if (!profile) return

    const genderValue: Gender = GENDER_OPTIONS.includes(gender) ? gender : 'other'
    const dobValue = dateOfBirth ? dateOfBirth : null

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        gender: genderValue,
        date_of_birth: dobValue,
        country,
        photo,
      })
      .eq('user_id', profile.user_id)

    if (error) {
      alert('Update failed: ' + error.message)
    } else {
      alert('Profile updated successfully!')
      router.back()
    }
  }

  return (
    <PageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Заголовок с iOS стрелкой */}
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
            </Pressable>
            <Text style={styles.title}>Edit profile</Text>
          </View>

          {/* Avatar + camera button */}
          <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />

          {/* Card with fields */}
          <View style={CommonStyles.card}>
            <View style={styles.field}>
              <Text style={CommonStyles.labelText}>First name</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Enter first name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Text style={CommonStyles.labelText}>Last name</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Enter last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>

            {/* Gender selector */}
            <View style={styles.field}>
              <Text style={CommonStyles.labelText}>Gender</Text>
              <View style={styles.pillsRow}>
                {GENDER_OPTIONS.map(opt => (
                  <Pressable
                    key={opt}
                    onPress={() => setGender(opt)}
                    style={[
                      styles.pill,
                      gender === opt && styles.pillActive,
                    ]}
                  >
                    <Text style={[styles.pillText, gender === opt && styles.pillTextActive]}>
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.field}>
              <Text style={CommonStyles.labelText}>Date of Birth</Text>
              <Pressable
                style={CommonStyles.input}
                onPress={() => {
                  setShowDOBPicker(true)
                  setDobTemp(
                    dobTemp ??
                      (dateOfBirth
                        ? new Date(
                            Number(dateOfBirth.slice(0, 4)),
                            Number(dateOfBirth.slice(5, 7)) - 1,
                            Number(dateOfBirth.slice(8, 10))
                          )
                        : new Date(1990, 0, 1))
                  )
                }}
              >
                <Text style={{ color: dateOfBirth ? '#111' : '#999', fontSize: 16 }}>
                  {dateOfBirth || 'Select date'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.field}>
              <Text style={CommonStyles.labelText}>Country</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Enter country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          {/* Actions */}
          <View style={CommonStyles.actions}>
            <Pressable style={[CommonStyles.buttonBase, CommonStyles.buttonPrimary]} onPress={saveProfile}>
              <Text style={CommonStyles.buttonPrimaryText}>Save</Text>
            </Pressable>
            <Pressable style={[CommonStyles.buttonBase, CommonStyles.buttonSecondary]} onPress={() => router.back()}>
              <Text style={CommonStyles.buttonSecondaryText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  )
}
