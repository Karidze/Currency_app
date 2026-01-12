import { useEffect, useState } from "react";
import { View, Pressable, ScrollView, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";

import AvatarWithCamera from "../../components/AvatarWithCamera";
import { useAvatar } from "../../hooks/useAvatar";
import { supabase } from "../../lib/supabase";

// ✅ new UI
import { Button, Card, Icon, Input, Screen, Text } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

export default function ContactSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [editingField, setEditingField] = useState<string | null>(null);

  const router = useRouter();
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar("");

  const { theme } = useTheme();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const userId = data?.user?.id;
      if (userId) {
        setEmail(data?.user?.email || "");

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profileData) {
          setProfile(profileData);
          setPhone(profileData.phone || "");
          setAddress1(profileData.address_1 || "");
          setAddress2(profileData.address_2 || "");
          setZipCode(profileData.zip_code || "");
          setPhoto(profileData.photo || "");
        }
      }
    });
  }, [setPhoto]);

  async function save() {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        phone,
        address_1: address1,
        address_2: address2,
        zip_code: zipCode,
        photo,
      })
      .eq("user_id", profile.user_id);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      alert("Contact info updated!");
      router.back();
    }
  }

  function renderField(
    label: string,
    value: string,
    setter: (v: string) => void,
    fieldKey: string,
    editable = true
  ) {
    const isEditing = editingField === fieldKey && editable;

    return (
      <View style={{ gap: 8 }}>
        <Text weight="600">{label}</Text>

        {isEditing ? (
          <Input
            value={value}
            onChangeText={setter}
            onBlur={() => setEditingField(null)}
            autoFocus
            placeholder={`Enter ${label}`}
            returnKeyType="done"
          />
        ) : (
          <View
            style={[
              styles.valueRow,
              {
                borderColor: theme.colors.inputBorder,
                backgroundColor: theme.colors.inputBg,
              },
            ]}
          >
            <Text
              color={value ? "text" : "muted"}
              style={value ? undefined : styles.placeholderItalic}
            >
              {value || "Not set"}
            </Text>

            {editable ? (
              <Pressable
                onPress={() => setEditingField(fieldKey)}
                style={styles.iconHit}
              >
                <Icon name="pencil" size={18} color="primary" />
              </Pressable>
            ) : null}
          </View>
        )}
      </View>
    );
  }

  return (
    <Screen padded={false}>
      <Stack.Screen options={{ headerShown: false }} />

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
            Contact Information
          </Text>

          <View style={{ width: 36 }} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />
        </View>

        {/* Fields */}
        <Card padding="lg" style={{ gap: theme.spacing.lg }}>
          {renderField("Email", email, setEmail, "email", false)}
          {renderField("Phone", phone, setPhone, "phone")}
          {renderField("Address line 1", address1, setAddress1, "address1")}
          {renderField("Address line 2", address2, setAddress2, "address2")}
          {renderField("ZIP Code", zipCode, setZipCode, "zip")}
        </Card>

        {/* Actions */}
        <View style={{ gap: theme.spacing.sm }}>
          <Button title="Save" onPress={save} fullWidth />
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            fullWidth
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarContainer: {
    alignItems: "center",
  },
  valueRow: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderItalic: {
    fontStyle: "italic",
  },
  iconHit: {
    paddingLeft: 12,
    paddingVertical: 8,
  },
});
