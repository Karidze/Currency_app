import { useEffect, useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import CommonStyles from '../../app/styles/CommonStyles'
import HeaderStyles from '../../app/styles/HeaderStyles'
import AvatarWithCamera from '../../components/AvatarWithCamera'
import { useAvatar } from '../../hooks/useAvatar'
import { supabase } from '../../lib/supabase'

export default function ContactSettings() {
  const [profile, setProfile] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [editingField, setEditingField] = useState<string | null>(null)

  const router = useRouter()
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar('')

  // Загружаем профиль и email
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const userId = data?.user?.id
      if (userId) {
        // email из auth.users
        setEmail(data?.user?.email || '')

        // остальные поля из profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (profileData) {
          setProfile(profileData)
          setPhone(profileData.phone || '')
          setAddress1(profileData.address_1 || '')
          setAddress2(profileData.address_2 || '')
          setZipCode(profileData.zip_code || '')
          setPhoto(profileData.photo || '')
        }
      }
    })
  }, [setPhoto])

  async function save() {
    if (!profile) return

    const { error } = await supabase
      .from('profiles')
      .update({
        phone,
        address_1: address1,
        address_2: address2,
        zip_code: zipCode,
        photo,
      })
      .eq('user_id', profile.user_id)

    if (error) {
      alert('Update failed: ' + error.message)
    } else {
      alert('Contact info updated!')
      router.back()
    }
  }

  function renderField(label: string, value: string, setter: (v: string) => void, fieldKey: string, editable = true) {
    return (
      <View style={styles.fieldRow}>
        <Text style={CommonStyles.labelText}>{label}</Text>
        {editingField === fieldKey && editable ? (
          <TextInput
            style={CommonStyles.input}
            value={value}
            onChangeText={setter}
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <View style={styles.valueRow}>
            <Text style={value ? styles.valueText : styles.placeholderText}>
              {value || 'Not set'}
            </Text>
            {editable && (
              <Pressable onPress={() => setEditingField(fieldKey)}>
                <FontAwesome name="pencil" size={18} color="#007AFF" />
              </Pressable>
            )}
          </View>
        )}
      </View>
    )
  }

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        
        {/* Заголовок */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>Contact Information</Text>
        </View>

        {/* Аватар */}
        <View style={styles.avatarContainer}>
          <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />
        </View>

        {/* Карточка с полями */}
        <View style={CommonStyles.card}>
          {/* email только для отображения */}
          {renderField('Email', email, setEmail, 'email', false)}
          {renderField('Phone', phone, setPhone, 'phone')}
          {renderField('Address line 1', address1, setAddress1, 'address1')}
          {renderField('Address line 2', address2, setAddress2, 'address2')}
          {renderField('ZIP Code', zipCode, setZipCode, 'zip')}
        </View>

        {/* Кнопки */}
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

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fieldRow: {
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  valueText: {
    fontSize: 16,
    color: '#111',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
})
