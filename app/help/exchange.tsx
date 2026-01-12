import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Card, Icon, Screen, Text } from "../../components/ui";

export default function ExchangeScreen() {
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
            Currency Exchange
          </Text>

          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg" style={{ gap: 10 }}>
          <Text weight="700">How to Exchange Currency</Text>
          <Text color="muted">
            • Navigate to the Exchange tab.{"\n"}• Select the currency you want
            to sell and the currency you want to buy.{"\n"}• Enter the amount
            and check the live exchange rate.{"\n"}• Confirm the transaction —
            your wallet will update instantly.{"\n"}• Verified users can access
            higher limits and faster processing.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}
