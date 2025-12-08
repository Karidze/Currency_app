// app/tabs/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function TabLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'rates':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'exchange':
              return (
                <View style={styles.exchangeButton}>
                  <Text style={styles.exchangeText}>💱</Text>
                </View>
              );
            case 'history':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={24} color={focused ? '#007AFF' : '#999'} />;
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
    position: 'absolute',
    bottom: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  exchangeText: {
    fontSize: 28,
    color: '#fff',
  },
});
