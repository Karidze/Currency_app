import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Card, Icon, Screen, Text } from "../../components/ui";

export default function WithdrawScreen() {
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
            Withdraw Funds
          </Text>

          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg" style={{ gap: 10 }}>
          <Text weight="700">Steps to Withdraw</Text>
          <Text color="muted">
            • Go to the Wallet section.{"\n"}• Choose “Withdraw” and select your
            preferred method (bank account or card).{"\n"}• Enter the amount and
            confirm.{"\n"}• Processing times vary depending on your bank.{"\n"}•
            Verification ensures secure withdrawals and prevents fraud.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}
