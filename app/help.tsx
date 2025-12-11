import { useState } from 'react'
import { View, Text, ScrollView, Pressable, TextInput, Image, StyleSheet } from 'react-native'
import PageContainer from '../components/PageContainer'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { useRouter, Stack } from 'expo-router'
import { useTheme } from '../context/ThemeContext'
import { getCommonStyles } from '../styles/CommonStyles'
import HeaderStyles from '../styles/HeaderStyles'

export default function HelpScreen() {
  const router = useRouter()
  const { isDark } = useTheme()
  const CommonStyles = getCommonStyles(isDark)
  const themeColor = isDark ? '#0A84FF' : '#007AFF'

  const [search, setSearch] = useState('')

  const sections = [
    {
      icon: 'rocket',
      label: 'Getting Started',
      path: '/help/getting-started',
      content:
        'Learn how to register, set up your profile, and why verification is required before trading.',
    },
    {
      icon: 'exchange-alt',
      label: 'Currency Exchange',
      path: '/help/exchange',
      content:
        'Step-by-step guide to exchanging currencies, checking rates, and confirming transactions.',
    },
    {
      icon: 'money-check-alt',
      label: 'Withdraw Funds',
      path: '/help/withdraw',
      content:
        'Instructions on withdrawing funds, linking bank accounts or cards, and processing times.',
    },
    {
      icon: 'envelope',
      label: 'Contact Us',
      path: '/help/contact',
      content:
        'Ways to reach support: in-app chat, email, and FAQs for common issues.',
    },
    {
      icon: 'user-shield',
      label: 'Privacy',
      path: '/help/privacy',
      content:
        'Details on how we protect your data, encryption, and our privacy policy.',
    },
  ]

  // фильтрация по поиску: ищем и по label, и по content
  const filteredSections = sections.filter(
    s =>
      s.label.toLowerCase().includes(search.toLowerCase()) ||
      s.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[CommonStyles.containerPadding, { paddingBottom: 100 }]}>
          {/* Header with back arrow */}
          <View style={HeaderStyles.headerRow}>
            <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
              <Ionicons name="chevron-back" size={24} color={themeColor} />
            </Pressable>
            <Text style={HeaderStyles.title}>Help Center</Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo-removebg-preview.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={[CommonStyles.smallText, { textAlign: 'center', marginBottom: 16 }]}>
            How can we help you?
          </Text>

          {/* Search */}
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: isDark ? '#1c1c1e' : '#F8FAFC',
                borderColor: isDark ? '#333' : '#E6EAF2',
              },
            ]}
          >
            <Ionicons name="search" size={20} color={themeColor} />
            <TextInput
              placeholder="Search in Help Center"
              placeholderTextColor={isDark ? '#888' : '#999'}
              style={[styles.searchInput, { color: isDark ? '#fff' : '#111' }]}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Sections */}
          <Text style={[CommonStyles.labelText, { marginBottom: 12 }]}>Help Topics</Text>
          {filteredSections.map((item, index) => (
            <Pressable
              key={index}
              style={[CommonStyles.card, styles.sectionCard]}
              onPress={() => router.push(item.path as any)}
            >
              <View style={styles.sectionRow}>
                <FontAwesome5 name={item.icon as any} size={20} color={themeColor} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={CommonStyles.itemLabel}>{item.label}</Text>
                  <Text style={[CommonStyles.smallText, { marginTop: 4 }]} numberOfLines={1}>
                    {item.content}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={themeColor} />
            </Pressable>
          ))}
        </ScrollView>

        {/* Floating Contact Button */}
        <Pressable
          style={[styles.contactButton, { backgroundColor: themeColor }]}
          onPress={() => router.push('/help/contact')}
        >
          <Text style={styles.contactText}>Contact Us</Text>
        </Pressable>
      </View>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  sectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
