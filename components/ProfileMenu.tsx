// components/ProfileMenu.tsx
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAvatar } from '../hooks/useAvatar'

export default function ProfileMenu({ profile, email, onLogout }: any) {
  const router = useRouter()
  // инициализируем хук общим фото из профиля
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar(profile?.photo || '')

  return (
    <View style={styles.container}>
      {/* Заголовок с аватаром */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <FontAwesome name="user-circle" size={96} color="#007AFF" />
          )}
          {/* Кнопка редактирования фото (камера) */}
          <Pressable style={styles.avatarEditBtn} onPress={pickAndUploadAvatar}>
            <FontAwesome name="camera" size={18} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.name}>
          {profile?.first_name} {profile?.last_name}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <MenuItem
          icon="id-card"
          label="Personal details"
          onPress={() => router.push('/edit-profile')}
        />
        <MenuItem icon="file-text" label="Document and Statement" />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Setting</Text>
        <MenuItem icon="cog" label="Settings" />
        <MenuItem icon="question-circle" label="Help" />
      </View>

      {/* More Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More Options</Text>
        <MenuItem icon="info-circle" label="About us" />
        <MenuItem icon="sign-out" label="Log out" onPress={onLogout} />
      </View>
    </View>
  )
}

function MenuItem({ icon, label, onPress }: any) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <FontAwesome name={icon} size={20} color="#007AFF" />
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <FontAwesome name="angle-right" size={20} color="#ccc" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: { gap: 24 },
  header: { alignItems: 'center', gap: 4 },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: { fontSize: 20, fontWeight: '600' },
  email: { fontSize: 14, color: '#666' },
  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#007AFF' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  itemLabel: { fontSize: 16 },
})
