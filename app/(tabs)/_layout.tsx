import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "rates":
              iconName = focused ? "stats-chart" : "stats-chart-outline";
              break;
            case "exchange":
              return (
                <View
                  style={[
                    styles.exchangeButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Image
                    source={require("../../assets/exchange.png")}
                    style={styles.exchangeIcon}
                    resizeMode="contain"
                  />
                </View>
              );
            case "history":
              iconName = focused ? "time" : "time-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? theme.colors.primary : theme.colors.mutedText}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="rates" />
      <Tabs.Screen name="exchange" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  exchangeButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -18,
  },
  exchangeIcon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
  },
});
