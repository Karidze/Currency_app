import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from 'react-native'
import PageContainer from '../components/PageContainer'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import CommonStyles from '../app/styles/CommonStyles'
import HeaderStyles from '../app/styles/HeaderStyles'
import { useRouter, Stack } from 'expo-router'

export default function AboutUsScreen() {
  const [modalVisible, setModalVisible] = useState<'about' | 'policy' | null>(null)
  const router = useRouter()

  return (
    <PageContainer>
      {/* Отключаем стандартный header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header row with back arrow */}
        <View style={HeaderStyles.headerRow}>
          <Pressable onPress={() => router.back()} style={HeaderStyles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={HeaderStyles.title}>About Us</Text>
        </View>

        {/* Menu items */}
        <Pressable style={CommonStyles.itemRow} onPress={() => setModalVisible('about')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="info-circle" size={20} color="#007AFF" />
            <Text style={CommonStyles.itemLabel}>About the App</Text>
          </View>
          <FontAwesome name="angle-right" size={20} color="#ccc" />
        </Pressable>

        <Pressable style={CommonStyles.itemRow} onPress={() => setModalVisible('policy')}>
          <View style={CommonStyles.itemLeft}>
            <FontAwesome name="file-text" size={20} color="#007AFF" />
            <Text style={CommonStyles.itemLabel}>Terms & Privacy Policy</Text>
          </View>
          <FontAwesome name="angle-right" size={20} color="#ccc" />
        </Pressable>
      </ScrollView>

      {/* Modal for "About the App" */}
      <Modal visible={modalVisible === 'about'} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>About the App</Text>
            <Text style={styles.modalText}>
              This is a currency exchange application designed for convenient and secure use.
              You can track exchange rates and manage your profile here.
            </Text>
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(null)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for "Terms & Privacy Policy" */}
      <Modal visible={modalVisible === 'policy'} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
            <Text style={styles.modalText}>
              By using this app, you agree to our terms and privacy policy.
              We care about the security of your data and use it only to improve the service.
            </Text>
            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(null)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
})
