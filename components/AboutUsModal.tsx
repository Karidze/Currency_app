// components/AboutUsModal.tsx
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "../hooks/useTheme";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Icon from "./ui/Icon";
import Text from "./ui/Text";

type ModalVisible = "about" | "policy" | null;

export default function AboutUsModal() {
  const [modalVisible, setModalVisible] = useState<ModalVisible>(null);
  const { theme } = useTheme();

  return (
    <>
      {/* Menu items */}
      <Pressable
        style={[styles.itemRow, { borderBottomColor: theme.colors.border }]}
        onPress={() => setModalVisible("about")}
      >
        <View style={styles.itemLeft}>
          <Icon name="info-circle" size={20} color={"muted"} />
          <Text weight="600">About the App</Text>
        </View>

        <Icon name="angle-right" size={20} color={"muted"} />
      </Pressable>

      <Pressable
        style={[styles.itemRow, { borderBottomColor: theme.colors.border }]}
        onPress={() => setModalVisible("policy")}
      >
        <View style={styles.itemLeft}>
          <Icon name="file-text" size={20} color={"primary"} />
          <Text weight="600">Terms & Privacy Policy</Text>
        </View>

        <Icon name="angle-right" size={20} color={"muted"} />
      </Pressable>

      {/* About */}
      <Modal
        visible={modalVisible === "about"}
        animationType="fade"
        transparent
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.colors.background }]}
          onPress={() => setModalVisible(null)}
        >
          <Pressable onPress={() => {}} style={styles.modalWrap}>
            <Card style={styles.modalCard}>
              <Text variant="title" weight="700">
                About the App
              </Text>

              <Text style={{ color: theme.colors.text }}>
                This is a currency exchange application designed for convenient
                and secure use. You can track exchange rates and manage your
                profile here.
              </Text>

              <View style={styles.actions}>
                <Button
                  title="Close"
                  variant="primary"
                  onPress={() => setModalVisible(null)}
                />
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Policy */}
      <Modal
        visible={modalVisible === "policy"}
        animationType="fade"
        transparent
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.colors.background }]}
          onPress={() => setModalVisible(null)}
        >
          <Pressable onPress={() => {}} style={styles.modalWrap}>
            <Card style={styles.modalCard}>
              <Text variant="title" weight="700">
                Terms & Privacy Policy
              </Text>

              <Text style={{ color: theme.colors.text }}>
                By using this app, you agree to our terms and privacy policy. We
                care about the security of your data and use it only to improve
                the service.
              </Text>

              <View style={styles.actions}>
                <Button
                  title="Close"
                  variant="primary"
                  onPress={() => setModalVisible(null)}
                />
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalWrap: {
    width: "100%",
  },
  modalCard: {
    gap: 12,
    padding: 16,
  },
  actions: {
    marginTop: 6,
  },
});
