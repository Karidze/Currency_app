import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

// ✅ new UI
import { Button, Card, Icon, Input, Screen, Text } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();

  function getPasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "red", progress: 0.33 };
    if (score === 2)
      return { label: "Medium", color: "orange", progress: 0.66 };
    return { label: "Strong", color: "green", progress: 1 };
  }

  async function save() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Unable to fetch user: " + userError?.message);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
      });
      if (signInError) {
        alert("Current password is incorrect");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) {
        alert("Password update failed: " + updateError.message);
        return;
      }

      alert("Password updated successfully!");
      router.back();
    } finally {
      setLoading(false);
    }
  }

  function renderPasswordField(
    label: string,
    value: string,
    setter: (v: string) => void,
    placeholder: string,
    show: boolean,
    toggleShow: () => void
  ) {
    return (
      <View style={{ gap: 8 }}>
        <Text weight="600">{label}</Text>

        <View style={styles.inputWrapper}>
          <Input
            value={value}
            onChangeText={setter}
            placeholder={placeholder}
            secureTextEntry={!show}
            style={styles.inputWithIcon}
          />

          <Pressable style={styles.eyeButton} onPress={toggleShow}>
            <Icon name={show ? "eye-slash" : "eye"} size={18} color="primary" />
          </Pressable>
        </View>
      </View>
    );
  }

  const strength = getPasswordStrength(newPassword);

  return (
    <Screen padded={false}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
            paddingBottom: theme.spacing.xl,
            gap: theme.spacing.lg,
          }}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => router.back()}
              style={{ width: 36, height: 36, justifyContent: "center" }}
            >
              <Icon name="chevron-left" color="primary" />
            </Pressable>

            <Text variant="subtitle" weight="700">
              Update Password
            </Text>

            <View style={{ width: 36 }} />
          </View>

          {/* Card */}
          <Card padding="lg" style={{ gap: theme.spacing.lg }}>
            <Text weight="700">Change your password</Text>

            {renderPasswordField(
              "Current Password",
              currentPassword,
              setCurrentPassword,
              "Enter current password",
              showCurrent,
              () => setShowCurrent(!showCurrent)
            )}

            {renderPasswordField(
              "New Password",
              newPassword,
              setNewPassword,
              "Enter new password",
              showNew,
              () => setShowNew(!showNew)
            )}

            {newPassword.length > 0 ? (
              <View style={{ gap: 6 }}>
                <View
                  style={[
                    styles.progressBg,
                    { backgroundColor: theme.colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${strength.progress * 100}%`,
                        backgroundColor: strength.color,
                      },
                    ]}
                  />
                </View>
                <Text style={{ color: strength.color }}>{strength.label}</Text>
              </View>
            ) : null}

            {renderPasswordField(
              "Confirm New Password",
              confirmPassword,
              setConfirmPassword,
              "Re-enter new password",
              showConfirm,
              () => setShowConfirm(!showConfirm)
            )}
          </Card>

          {/* Actions */}
          <View style={{ gap: theme.spacing.sm }}>
            <Pressable
              disabled={loading}
              onPress={save}
              style={{ width: "100%" }}
            >
              <Button title="Save" fullWidth loading={loading} onPress={save} />
            </Pressable>

            <Button
              title="Cancel"
              variant="outline"
              fullWidth
              disabled={loading}
              onPress={() => router.back()}
            />
          </View>

          {loading ? (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    height: "100%",
    justifyContent: "center",
  },
  progressBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
});
