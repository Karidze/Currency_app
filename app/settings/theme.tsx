import {
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// ✅ new UI
import { Card, Icon, Screen, Text } from "../../components/ui";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeSettings() {
  const router = useRouter();
  const { isDark, toggle, theme } = useTheme(); // ✅ toggle (new API)

  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 75],
  });

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
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={{ width: 36, height: 36, justifyContent: "center" }}
          >
            <Icon name="chevron-left" color="primary" />
          </Pressable>
          <Text variant="subtitle" weight="700">
            Theme
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <Card padding="lg" style={{ gap: theme.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text weight="600">Select Theme</Text>

            <View style={{ alignItems: "flex-end", gap: 10 }}>
              <Text color="muted">
                {isDark ? "Dark Mode 🌙" : "Light Mode ☀️"}
              </Text>

              <TouchableOpacity
                style={[
                  styles.switchTrack,
                  {
                    backgroundColor: theme.colors.inputBg,
                    borderColor: theme.colors.inputBorder,
                  },
                ]}
                onPress={toggle}
                activeOpacity={0.85}
              >
                <Animated.View
                  style={[styles.switchThumb, { transform: [{ translateX }] }]}
                >
                  <LinearGradient
                    colors={
                      isDark
                        ? ["#4B0082", theme.colors.primary]
                        : ["#FFD700", "#FF8C00"]
                    }
                    style={styles.gradient}
                  >
                    <Ionicons
                      name={isDark ? "moon" : "sunny"}
                      size={20}
                      color="#fff"
                    />
                  </LinearGradient>
                </Animated.View>

                <View style={styles.iconsRow}>
                  <Ionicons name="sunny" size={18} color="#FFD700" />
                  <Ionicons name="moon" size={18} color="#4B0082" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
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

  switchTrack: {
    width: 120,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 1,
  },
  switchThumb: {
    position: "absolute",
    top: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 9,
  },
});
