import { useState } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '../lib/supabase'

export function useAvatar(initialPhoto?: string) {
  const [photo, setPhoto] = useState<string>(initialPhoto || '')
  const [uploading, setUploading] = useState<boolean>(false)

  async function pickAndUploadAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access media library is required.')
      return null
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (result.canceled) return null

    const asset = result.assets?.[0]
    if (!asset?.uri) return null

    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User session not found')

      const ext =
        asset.fileName?.split('.').pop()?.toLowerCase() ||
        asset.mimeType?.split('/').pop()?.toLowerCase() ||
        'jpg'
      const filePath = `${user.id}/${Date.now()}.${ext}`

      const resp = await fetch(asset.uri)
      const arrayBuffer = await resp.arrayBuffer()
      const uint8 = new Uint8Array(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, uint8, {
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const publicUrl = data.publicUrl || ''

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ photo: publicUrl })
        .eq('user_id', user.id)

      if (updateError) throw updateError

      setPhoto(publicUrl)
      return publicUrl
    } catch (error: any) {
      console.error(error)
      Alert.alert('Error', error.message || 'Something went wrong during upload')
      return null
    } finally {
      setUploading(false)
    }
  }

  return { photo, setPhoto, uploading, pickAndUploadAvatar }
}