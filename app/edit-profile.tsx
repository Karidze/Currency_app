import { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import PageContainer from '../components/PageContainer'
import { useRouter } from 'expo-router'
import { useAvatar } from '../hooks/useAvatar'

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
          <View style={styles.avatarWrapper}>
            <Pressable onPress={pickAndUploadAvatar}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={{ color: '#007AFF', fontSize: 32 }}>+</Text>
                </View>
              )}
            </Pressable>

            <Pressable style={styles.avatarEditBtn} onPress={pickAndUploadAvatar}>
              <FontAwesome name="camera" size={16} color="#fff" />
            </Pressable>
          </View>

          {/* Card with fields */}
          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>

            {/* Gender selector */}
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>
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
              <Text style={styles.label}>Date of Birth</Text>
              <Pressable
                style={styles.input}
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
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.buttonPrimary]} onPress={saveProfile}>
              <Text style={styles.buttonPrimaryText}>Save</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSecondary]} onPress={() => router.back()}>
              <Text style={styles.buttonSecondaryText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },

  // Header row with back arrow
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },

  // Avatar
  avatarWrapper: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Card and fields
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E6EAF2',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
  },

  // Gender pills
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: '#fff',
  },
  pillActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF',
  },
  pillText: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  pillTextActive: {
    color: '#007AFF',
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
})
