import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function AvatarWithCamera({
  photo,
  onPress,
}: {
  photo?: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.avatarWrapper}>
      <Pressable onPress={onPress} style={styles.pressable}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={[
              styles.avatar,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.card,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.avatar,
              styles.avatarPlaceholder,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.inputBg,
              },
            ]}
          >
            <FontAwesome name="user" size={44} color={theme.colors.mutedText} />
          </View>
        )}
      </Pressable>

      <Pressable
        style={[
          styles.avatarEditBtn,
          {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.card,
          },
        ]}
        onPress={onPress}
      >
        <FontAwesome name="camera" size={16} color={theme.colors.primaryText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
    alignSelf: "center",
    marginBottom: 16,
  },
  pressable: { borderRadius: 999 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
