//app/(tabs)/profile.tsx

import { useEffect, useState } from "react";
import AuthForm from "../../components/Auth/AuthForm";
import ProfileMenu from "../../components/ProfileMenu";
import { supabase } from "../../lib/supabase";

import { Screen, Text } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

export default function ProfileScreen() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const { theme } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session)
        loadProfile(data.session.user.id, data.session.user.email ?? undefined);
    });

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

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function loadProfile(userId: string, email?: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.log("loadProfile SELECT error:", error.message);
    }

    if (data) {
      setProfile(data);
      return;
    }

    const { data: created, error: insertError } = await supabase
      .from("profiles")
      .insert({ user_id: userId, email: email ?? null })
      .select("*")
      .single();

    if (insertError) {
      console.log("loadProfile INSERT error:", insertError.message);
      setProfile({ user_id: userId, email: email ?? null });
      return;
    }

    setProfile(created);
  }

  if (!session) {
    return (
      <Screen>
        <AuthForm />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      {profile ? (
        <ProfileMenu
          profile={profile}
          email={session.user.email}
          onLogout={signOut}
        />
      ) : (
        <Screen
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          <Text color="muted">Loading profile...</Text>
        </Screen>
      )}
    </Screen>
  );
}
