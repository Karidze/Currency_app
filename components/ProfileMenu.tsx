import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useAvatar } from "../hooks/useAvatar";
import { useTheme } from "../hooks/useTheme";
import AboutUsModal from "./AboutUsModal";
import AvatarWithCamera from "./AvatarWithCamera";
import { Card, Icon, Text } from "./ui";

export default function ProfileMenu({ profile, email, onLogout }: any) {
  const router = useRouter();
  const { photo, setPhoto, pickAndUploadAvatar } = useAvatar(
    profile?.photo || ""
  );
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { padding: theme.spacing.lg }]}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Card padding="lg" style={styles.headerCard}>
        <AvatarWithCamera photo={photo} onPress={pickAndUploadAvatar} />
        <Text variant="subtitle" weight="700" center>
          {profile?.first_name} {profile?.last_name}
        </Text>
        <Text color="muted" center>
          {email}
        </Text>
      </Card>

      <Card padding="lg" style={styles.section}>
        <Text weight="700">Personal Information</Text>
        <MenuItem
          icon="id-card"
          label="Personal details"
          onPress={() => router.push("/edit-profile")}
        />
        <MenuItem icon="file-text" label="Document and Statement" />
      </Card>

      <Card padding="lg" style={styles.section}>
        <Text weight="700">Settings</Text>
        <MenuItem
          icon="cog"
          label="Settings"
          onPress={() => router.push("/settings")}
        />
        <MenuItem
          icon="question-circle"
          label="Help"
          onPress={() => router.push("/help")}
        />
      </Card>

      <Card padding="lg" style={styles.section}>
        <Text weight="700">More Options</Text>
        <AboutUsModal />
        <MenuItem icon="sign-out" label="Log out" onPress={onLogout} danger />
      </Card>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.itemRow, { borderBottomColor: theme.colors.border }]}
    >
      <View style={styles.itemLeft}>
        <Icon
          name={icon}
          size={20}
          color={danger ? "muted" : "primary"}
          // @ts-ignore
        />
        <Text
          weight="600"
          style={{ color: danger ? theme.colors.danger : theme.colors.text }}
        >
          {label}
        </Text>
      </View>

      <Icon name="angle-right" size={20} color="muted" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: 30,
  },
  headerCard: {
    gap: 8,
    alignItems: "center",
  },
  section: {
    gap: 10,
  },
  itemRow: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
