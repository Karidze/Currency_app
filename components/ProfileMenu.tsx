import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function ProfileMenu({ profile, email, onLogout }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={64} color="#007AFF" />
        <Text style={styles.name}>{profile.first_name} {profile.last_name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <MenuItem icon="id-card" label="Personal details" />
        <MenuItem icon="file-text" label="Document and Statement" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Setting</Text>
        <MenuItem icon="cog" label="Settings" />
        <MenuItem icon="question-circle" label="Help" />
      </View>

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
