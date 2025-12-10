// app/tabs/_layout.tsx

import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { lightTheme, darkTheme } from '../../styles/ThemesStyle'

export default function TabLayout() {
  const navigation = useNavigation()
  const { isDark } = useTheme()
  const colors = isDark ? darkTheme : lightTheme

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'rates':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline'
              break
            case 'exchange':
              return (
                <View style={[styles.exchangeButton, { backgroundColor: colors.primary }]}>
                  <Text style={styles.exchangeText}>💱</Text>
                </View>
              )
            case 'history':
              iconName = focused ? 'time' : 'time-outline'
              break
            case 'profile':
              iconName = focused ? 'person' : 'person-outline'
              break
            default:
              iconName = 'ellipse'
          }

          return <Ionicons name={iconName} size={24} color={focused ? colors.primary : colors.secondaryText} />
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="rates" />
      <Tabs.Screen name="exchange" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  exchangeButton: {
    position: 'absolute',
    bottom: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
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
})
