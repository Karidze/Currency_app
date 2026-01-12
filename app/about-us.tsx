import { View, Pressable, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";

import AboutUsModal from "../components/AboutUsModal";

// ✅ new UI
import { Card, Icon, Screen, Text } from "../components/ui";
import { useTheme } from "../hooks/useTheme";

export default function AboutUsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

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
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ width: 36, height: 36, justifyContent: "center" }}
          >
            <Icon name="chevron-left" color="primary" />
          </Pressable>

          <Text variant="subtitle" weight="700">
            About Us
          </Text>

          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg">
          <AboutUsModal />
        </Card>
      </ScrollView>
    </Screen>
  );
}
