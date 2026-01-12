import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Screen, Text, Card, Input, Icon, Button } from "../components/ui";
import { useTheme } from "../hooks/useTheme";

export default function HelpScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const sections = [
    {
      icon: "rocket",
      label: "Getting Started",
      path: "/help/getting-started",
      content:
        "Learn how to register, set up your profile, and why verification is required before trading.",
    },
    {
      icon: "exchange",
      label: "Currency Exchange",
      path: "/help/exchange",
      content:
        "Step-by-step guide to exchanging currencies, checking rates, and confirming transactions.",
    },
    {
      icon: "money",
      label: "Withdraw Funds",
      path: "/help/withdraw",
      content:
        "Instructions on withdrawing funds, linking bank accounts or cards, and processing times.",
    },
    {
      icon: "envelope",
      label: "Contact Us",
      path: "/help/contact",
      content:
        "Ways to reach support: in-app chat, email, and FAQs for common issues.",
    },
    {
      icon: "shield",
      label: "Privacy",
      path: "/help/privacy",
      content:
        "Details on how we protect your data, encryption, and our privacy policy.",
    },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter(
      (s) =>
        s.label.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Screen padded={false}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
          paddingBottom: 120,
        }}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Icon name="chevron-left" color="primary" />
          </Pressable>
          <Text variant="subtitle" weight="700">
            Help Center
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text color="muted" center style={{ marginBottom: 14 }}>
          How can we help you?
        </Text>

        <Input
          placeholder="Search in Help Center"
          value={search}
          onChangeText={setSearch}
        />

        <View style={{ height: 16 }} />

        <Text weight="700" style={{ marginBottom: 10 }}>
          Help Topics
        </Text>

        <View style={{ gap: 10 }}>
          {filtered.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => router.push(item.path as any)}
            >
              <Card padding="md" style={styles.topicCard}>
                <View style={styles.topicLeft}>
                  <Icon name={item.icon as any} color="primary" />
                  <View style={{ flex: 1 }}>
                    <Text weight="700">{item.label}</Text>
                    <Text
                      color="muted"
                      numberOfLines={1}
                      style={{ marginTop: 4 }}
                    >
                      {item.content}
                    </Text>
                  </View>
                </View>
                <Icon name="chevron-right" color="muted" />
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.floating, { padding: theme.spacing.lg }]}>
        <Button
          title="Contact Us"
          fullWidth
          onPress={() => router.push("/help/contact")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 10 },
  logo: { width: 80, height: 80 },
  topicCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  topicLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  floating: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
