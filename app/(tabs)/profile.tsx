// app/tabs/profile.tsx
import { useEffect, useState } from "react";
import { Text } from "react-native";
import AuthForm from "../../components/AuthForm";
import PageContainer from "../../components/PageContainer";
import ProfileMenu from "../../components/ProfileMenu";
import { supabase } from "../../lib/supabase";

export default function ProfileScreen() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Проверяем текущую сессию
    // supabase.auth.getSession().then(({ data }) => {
    //   setSession(data.session)
    //   if (data.session) loadProfile(data.session.user.id, data.session.user.email ?? undefined)
    // })

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session)
        loadProfile(data.session.user.id, data.session.user.email ?? undefined);
    });

    // Подписка на изменения состояния авторизации
    // const { data: listener } = supabase.auth.onAuthStateChange(
    //   (_event, session) => {
    //     setSession(session);
    //     if (session) loadProfile(session.user.id);
    //     else setProfile(null);
    //   }
    // );

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session)
          loadProfile(session.user.id, session.user.email ?? undefined);
        else setProfile(null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // async function loadProfile(userId: string) {
  //   const { data, error } = await supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('user_id', userId)
  //     .single()

  //   if (!error && data) {
  //     setProfile(data)
  //   }
  // }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function loadProfile(userId: string, email?: string) {
    // 1) Пробуємо знайти профіль
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(); // не кидає помилку якщо профілю нема

    if (error) {
      console.log("loadProfile SELECT error:", error.message);
    }

    // якщо профіль знайдено
    if (data) {
      setProfile(data);
      return;
    }

    // 2) Якщо профілю нема — створюємо його
    const { data: created, error: insertError } = await supabase
      .from("profiles")
      .insert({ user_id: userId, email: email ?? null })
      .select("*")
      .single();

    if (insertError) {
      console.log("loadProfile INSERT error:", insertError.message);
      // щоб не висів лоадер вічно — показуємо хоча б "порожній" профіль
      setProfile({ user_id: userId, email: email ?? null });
      return;
    }

    setProfile(created);
  }

  // Если пользователь не авторизован → показываем форму входа/регистрации
  if (!session) {
    return (
      <PageContainer>
        <AuthForm />
      </PageContainer>
    );
  }

  // Если авторизован → показываем меню профиля
  return (
    <PageContainer>
      {profile ? (
        <ProfileMenu
          profile={profile}
          email={session.user.email}
          onLogout={signOut}
        />
      ) : (
        <Text style={{ fontSize: 16 }}>Loading profile...</Text>
      )}
    </PageContainer>
  );
}
