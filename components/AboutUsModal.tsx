import { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import CommonStyles from '../app/styles/CommonStyles'

export default function AboutUsModal() {
  const [modalVisible, setModalVisible] = useState<'about' | 'policy' | null>(null)

  return (
    <>
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

      {/* Modal for "About the App" */}
      <Modal visible={modalVisible === 'about'} animationType="slide" transparent={true}>
        <View style={CommonStyles.modalOverlay}>
          <View style={CommonStyles.modalCard}>
            <Text style={CommonStyles.modalTitle}>About the App</Text>
            <Text style={CommonStyles.modalText}>
              This is a currency exchange application designed for convenient and secure use.
              You can track exchange rates and manage your profile here.
            </Text>
            <Pressable style={CommonStyles.closeBtn} onPress={() => setModalVisible(null)}>
              <Text style={CommonStyles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for "Terms & Privacy Policy" */}
      <Modal visible={modalVisible === 'policy'} animationType="slide" transparent={true}>
        <View style={CommonStyles.modalOverlay}>
          <View style={CommonStyles.modalCard}>
            <Text style={CommonStyles.modalTitle}>Terms & Privacy Policy</Text>
            <Text style={CommonStyles.modalText}>
              By using this app, you agree to our terms and privacy policy.
              We care about the security of your data and use it only to improve the service.
            </Text>
            <Pressable style={CommonStyles.closeBtn} onPress={() => setModalVisible(null)}>
              <Text style={CommonStyles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}
