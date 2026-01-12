import { useEffect, useState } from "react";
import {
  View,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, Stack } from "expo-router";
import { supabase } from "../lib/supabase";

import { useAvatar } from "../hooks/useAvatar";
import AvatarWithCamera from "../components/AvatarWithCamera";

// ✅ new UI
import { Button, Card, Icon, Input, Screen, Text } from "../components/ui";
import { useTheme } from "../hooks/useTheme";

const GENDER_OPTIONS = ["male", "female", "other"] as const;
type Gender = (typeof GENDER_OPTIONS)[number];

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<Gender>("other");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [showDOBPicker, setShowDOBPicker] = useState(false);
  const [dobTemp, setDobTemp] = useState<Date | undefined>(undefined);

  const router = useRouter();
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar("");
  const { theme, isDark } = useTheme();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const userId = data?.user?.id;
      if (userId) {
        supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single()
          .then(({ data }) => {
            if (data) {
              setProfile(data);
              setFirstName(data.first_name || "");
              setLastName(data.last_name || "");
              const g = (data.gender || "").toLowerCase();
              setGender(
                GENDER_OPTIONS.includes(g as Gender) ? (g as Gender) : "other"
              );
              setDateOfBirth(data.date_of_birth || "");
              setCountry(data.country || "");
              setPhoto(data.photo || "");
              if (data.date_of_birth) {
                const parts = String(data.date_of_birth).split("-").map(Number);
                if (parts.length === 3 && !Number.isNaN(parts[0])) {
                  setDobTemp(new Date(parts[0], parts[1] - 1, parts[2]));
                }
              }
            }
          });
      }
    });
  }, [setPhoto]);

  async function saveProfile() {
    if (!profile) return;

    const genderValue: Gender = GENDER_OPTIONS.includes(gender)
      ? gender
      : "other";
    const dobValue = dateOfBirth ? dateOfBirth : null;

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        gender: genderValue,
        date_of_birth: dobValue,
        country,
        photo,
      })
      .eq("user_id", profile.user_id);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      alert("Profile updated successfully!");
      router.back();
    }
  }

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
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
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
              Edit Profile
            </Text>
            <View style={{ width: 36 }} />
          </View>

          {/* Avatar */}
          <View style={{ alignItems: "center" }}>
            <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />
          </View>

          {/* Fields */}
          <Card padding="lg" style={{ gap: theme.spacing.lg }}>
            <View style={{ gap: 8 }}>
              <Text weight="600">First name</Text>
              <Input
                placeholder="Enter first name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={{ gap: 8 }}>
              <Text weight="600">Last name</Text>
              <Input
                placeholder="Enter last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>

            {/* Gender pills */}
            <View style={{ gap: 10 }}>
              <Text weight="600">Gender</Text>
              <View style={styles.pillsRow}>
                {GENDER_OPTIONS.map((opt) => {
                  const active = gender === opt;
                  return (
                    <Pressable
                      key={opt}
                      onPress={() => setGender(opt)}
                      style={[
                        styles.pill,
                        {
                          borderColor: active
                            ? theme.colors.primary
                            : theme.colors.border,
                          backgroundColor: active
                            ? theme.colors.primary
                            : "transparent",
                        },
                      ]}
                    >
                      <Text
                        weight="600"
                        color={active ? "text" : "muted"}
                        style={{
                          color: active
                            ? theme.colors.primaryText
                            : theme.colors.text,
                        }}
                      >
                        {opt}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={{ gap: 8 }}>
              <Text weight="600">Date of Birth</Text>

              <Pressable
                style={[
                  styles.dateBox,
                  {
                    backgroundColor: theme.colors.inputBg,
                    borderColor: theme.colors.inputBorder,
                    borderRadius: theme.radius.md,
                  },
                ]}
                onPress={() => {
                  setShowDOBPicker(true);
                  setDobTemp(
                    dobTemp ??
                      (dateOfBirth
                        ? new Date(
                            Number(dateOfBirth.slice(0, 4)),
                            Number(dateOfBirth.slice(5, 7)) - 1,
                            Number(dateOfBirth.slice(8, 10))
                          )
                        : new Date(1990, 0, 1))
                  );
                }}
              >
                <Text color={dateOfBirth ? "text" : "muted"}>
                  {dateOfBirth || "Select date"}
                </Text>
              </Pressable>

              {showDOBPicker && dobTemp ? (
                <DateTimePicker
                  value={dobTemp}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(_, date) => {
                    if (Platform.OS !== "ios") setShowDOBPicker(false);
                    if (date) {
                      const y = date.getFullYear();
                      const m = String(date.getMonth() + 1).padStart(2, "0");
                      const d = String(date.getDate()).padStart(2, "0");
                      setDateOfBirth(`${y}-${m}-${d}`);
                      setDobTemp(date);
                    }
                  }}
                />
              ) : null}

              {Platform.OS === "ios" && showDOBPicker ? (
                <View style={{ gap: theme.spacing.sm }}>
                  <Button
                    title="Done"
                    onPress={() => setShowDOBPicker(false)}
                    fullWidth
                  />
                </View>
              ) : null}
            </View>

            <View style={{ gap: 8 }}>
              <Text weight="600">Country</Text>
              <Input
                placeholder="Enter country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </Card>

          {/* Actions */}
          <View style={{ gap: theme.spacing.sm }}>
            <Button title="Save" onPress={saveProfile} fullWidth />
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => router.back()}
              fullWidth
            />
          </View>
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

  pillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  pill: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  dateBox: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
});
