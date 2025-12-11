import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useAvatar } from '../hooks/useAvatar'
import AvatarWithCamera from './AvatarWithCamera'
import { getCommonStyles } from '../styles/CommonStyles'
import AboutUsModal from './AboutUsModal'
import { useTheme } from '../context/ThemeContext'

export default function ProfileMenu({ profile, email, onLogout }: any) {
  const router = useRouter()
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar(profile?.photo || '')
  const { isDark } = useTheme()
  const CommonStyles = getCommonStyles(isDark)

  return (
    <ScrollView
      contentContainerStyle={[CommonStyles.containerPadding, styles.container]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {/* Заголовок с аватаром */}
      <View style={styles.header}>
        <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />

        <Text style={[styles.name, { color: isDark ? '#fff' : '#111' }]}>
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
          isDark={isDark}
          CommonStyles={CommonStyles}
        />
        <MenuItem icon="file-text" label="Document and Statement" isDark={isDark} CommonStyles={CommonStyles} />
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Settings</Text>
        <MenuItem
          icon="cog"
          label="Settings"
          onPress={() => router.push('/settings')}
          isDark={isDark}
          CommonStyles={CommonStyles}
        />
        <MenuItem
          icon="question-circle"
          label="Help"
          onPress={() => router.push('/help')} 
          isDark={isDark}
          CommonStyles={CommonStyles}
        />
      </View>

      {/* More Options */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>More Options</Text>
        <AboutUsModal />
        <MenuItem
          icon="sign-out"
          label="Log out"
          onPress={onLogout}
          isDark={isDark}
          CommonStyles={CommonStyles}
        />
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  )
}

function MenuItem({ icon, label, onPress, isDark, CommonStyles }: any) {
  return (
    <Pressable style={CommonStyles.itemRow} onPress={onPress}>
      <View style={CommonStyles.itemLeft}>
        <FontAwesome name={icon} size={20} color={isDark ? '#0A84FF' : '#007AFF'} />
        <Text style={CommonStyles.itemLabel}>{label}</Text>
      </View>
      <FontAwesome name="angle-right" size={20} color={isDark ? '#888' : '#ccc'} />
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
