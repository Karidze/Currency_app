// app/tabs/profile.tsx
import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { supabase } from '../../lib/supabase'
import PageContainer from '../../components/PageContainer'
import AuthForm from '../../components/AuthForm'
import ProfileMenu from '../../components/ProfileMenu'

export default function ProfileScreen() {
  const [session, setSession] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    // Проверяем текущую сессию
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) loadProfile(data.session.user.id)
    })

    // Подписка на изменения состояния авторизации
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else setProfile(null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function loadProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!error && data) {
      setProfile(data)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  // Если пользователь не авторизован → показываем форму входа/регистрации
  if (!session) {
    return (
      <PageContainer>
        <AuthForm />
      </PageContainer>
    )
  }

  // Если авторизован → показываем меню профиля
  return (
    <PageContainer>
      {profile ? (
        <ProfileMenu profile={profile} email={session.user.email} onLogout={signOut} />
      ) : (
        <Text style={{ fontSize: 16 }}>Loading profile...</Text>
      )}
    </PageContainer>
  )
}
