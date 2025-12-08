// components/AvatarWithCamera.tsx
import { View, Image, Pressable, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function AvatarWithCamera({ photo, onPress }: { photo?: string, onPress: () => void }) {
  return (
    <View style={styles.avatarWrapper}>
      <Pressable onPress={onPress}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={{ color: '#007AFF', fontSize: 32 }}>+</Text>
          </View>
        )}
      </Pressable>

      <Pressable style={styles.avatarEditBtn} onPress={onPress}>
        <FontAwesome name="camera" size={16} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
})
