// components/ProfileMenu.tsx
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAvatar } from '../hooks/useAvatar'
import AvatarWithCamera from './AvatarWithCamera'
import CommonStyles from '../app/styles/CommonStyles'

export default function ProfileMenu({ profile, email, onLogout }: any) {
  const router = useRouter()
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar(profile?.photo || '')

  return (
    <ScrollView
      contentContainerStyle={[CommonStyles.containerPadding, styles.container]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {/* Заголовок с аватаром */}
      <View style={styles.header}>
        <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />

        <Text style={styles.name}>
          {profile?.first_name} {profile?.last_name}
        </Text>
        <Text style={CommonStyles.smallText}>{email}</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Personal Information</Text>
        <MenuItem
          icon="id-card"
          label="Personal details"
          onPress={() => router.push('/edit-profile')}
        />
        <MenuItem icon="file-text" label="Document and Statement" />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Setting</Text>
        <MenuItem icon="cog" label="Settings" />
        <MenuItem icon="question-circle" label="Help" />
      </View>

      {/* More Options */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>More Options</Text>
        <MenuItem icon="info-circle" label="About us" />
        <MenuItem icon="sign-out" label="Log out" onPress={onLogout} />
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  )
}

function MenuItem({ icon, label, onPress }: any) {
  return (
    <Pressable style={CommonStyles.itemRow} onPress={onPress}>
      <View style={CommonStyles.itemLeft}>
        <FontAwesome name={icon} size={20} color="#007AFF" />
        <Text style={CommonStyles.itemLabel}>{label}</Text>
      </View>
      <FontAwesome name="angle-right" size={20} color="#ccc" />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  header: { alignItems: 'center', gap: 4 },
  name: { fontSize: 20, fontWeight: '600' },
  section: { gap: 8 },
})
