// hooks/useAvatar.ts
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '../lib/supabase'

export function useAvatar(initialPhoto?: string) {
  const [photo, setPhoto] = useState<string>(initialPhoto || '')

  async function pickAndUploadAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access media library is required.')
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

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const ext =
      asset.fileName?.split('.').pop()?.toLowerCase() ||
      asset.mimeType?.split('/').pop()?.toLowerCase() ||
      'jpg'
    const filePath = `${user.id}/${Date.now()}.${ext}`

    const resp = await fetch(asset.uri)
    const arrayBuffer = await resp.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, uint8, {
        contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        upsert: true,
      })

    if (error) {
      alert('Upload failed: ' + error.message)
      return null
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const publicUrl = data.publicUrl || ''

    setPhoto(publicUrl)

    await supabase
      .from('profiles')
      .update({ photo: publicUrl })
      .eq('user_id', user.id)

    return publicUrl
  }

  return { photo, setPhoto, pickAndUploadAvatar }
}
