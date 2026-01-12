import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Card, Icon, Screen, Text } from "../../components/ui";
import AboutUsModal from "../../components/AboutUsModal";
import { useTheme } from "../../hooks/useTheme";

export default function SettingsMenu() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Screen padded={false}>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={[
          styles.container,
          {
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
          },
        ]}
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
            Settings
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg" style={{ paddingVertical: 8 }}>
          <Row
            icon="adjust"
            label="Theme"
            onPress={() => router.push("/settings/theme")}
            border
          />
          <Row
            icon="address-card"
            label="Contact Information"
            onPress={() => router.push("/settings/contact")}
            border
          />
          <Row
            icon="lock"
            label="Password"
            onPress={() => router.push("/settings/password")}
          />
        </Card>

        <View style={{ height: 12 }} />

        <Card padding="lg" style={{ paddingVertical: 8 }}>
          <AboutUsModal />
        </Card>
      </View>
    </Screen>
  );
}

function Row({
  icon,
  label,
  onPress,
  border,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  border?: boolean;
}) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        border
          ? {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: theme.colors.border,
            }
          : null,
      ]}
    >
      <View style={styles.rowLeft}>
        <Icon name={icon} color="primary" />
        <Text weight="600">{label}</Text>
      </View>
      <Icon name="chevron-right" color="muted" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 14 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  row: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
});
