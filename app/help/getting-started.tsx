import React from "react";
import { Pressable, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Card, Icon, Screen, Text } from "../../components/ui";

export default function GettingStartedScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />

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
          <Icon name="chevron-left" color="primary" />
        </Pressable>
        <Text variant="subtitle" weight="700">
          Getting Started
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <Card padding="lg" style={{ gap: 10 }}>
        <Text weight="700">Welcome to Currency Exchange App</Text>
        <Text color="muted">
          • Register with your email and create a secure password.{"\n"}•
          Complete your profile with personal details.{"\n"}• Verification is
          required before you can exchange or trade currencies.{"\n"}• Once
          verified, you’ll gain access to exchange, withdrawal, and trading
          features.{"\n"}• Explore the dashboard to monitor rates and manage
          your wallet.
        </Text>
      </Card>
    </Screen>
  );
}
