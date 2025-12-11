import { View, Text, ScrollView, Pressable, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../../context/ThemeContext'
import { getCommonStyles } from '../../styles/CommonStyles'
import HeaderStyles from '../../styles/HeaderStyles'
import { useRef, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function ThemeSettings() {
  const router = useRouter()
  const { isDark, toggleTheme } = useTheme()
  const CommonStyles = getCommonStyles(isDark)

  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current
  useEffect(() => {
    Animated.timing(anim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isDark])

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 75], // движение бегунка
  })

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={CommonStyles.containerPadding}>
        {/* Header */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color={isDark ? '#0A84FF' : '#007AFF'} />
          </Pressable>
          <Text style={HeaderStyles.title}>Theme</Text>
        </View>

        {/* Карточка с переключателем */}
        <View style={CommonStyles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={CommonStyles.labelText}>Select Theme</Text>

            {/* Блок справа */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[CommonStyles.smallText, { marginBottom: 10 }]}>
                {isDark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
              </Text>

              <TouchableOpacity style={styles.switchTrack} onPress={toggleTheme} activeOpacity={0.8}>
                <Animated.View style={[styles.switchThumb, { transform: [{ translateX }] }]}>
                  <LinearGradient
                    colors={isDark ? ['#4B0082', '#0A84FF'] : ['#FFD700', '#FF8C00']}
                    style={styles.gradient}
                  >
                    <Ionicons name={isDark ? 'moon' : 'sunny'} size={24} color="#fff" />
                  </LinearGradient>
                </Animated.View>
                <View style={styles.iconsRow}>
                  <Ionicons name="sunny" size={20} color="#FFD700" />
                  <Ionicons name="moon" size={20} color="#4B0082" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  switchTrack: {
    width: 120,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  switchThumb: {
    position: 'absolute',
    top: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8.5,
  },
})
