import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Card, Icon, Screen, Text } from "../../components/ui";

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <Screen padded={false}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 18,
          paddingBottom: 30,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ width: 36, height: 36, justifyContent: "center" }}
          >
            <Icon name="chevron-left" size={22} color="primary" />
          </Pressable>

          <Text variant="subtitle" weight="700">
            Privacy
          </Text>

          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg" style={{ gap: 10 }}>
          <Text weight="700">Your Privacy Matters</Text>
          <Text color="muted">
            • All user data is encrypted and stored securely.{"\n"}•
            Verification documents are used only for compliance and never shared
            with third parties.{"\n"}• We follow strict financial regulations to
            protect your identity.{"\n"}• Review our Privacy Policy regularly
            for updates.{"\n"}• You control your account and can request data
            deletion anytime.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}
