// components/ui/Button.tsx
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import Text from "./Text";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  fullWidth,
  style,
}: Props) {
  const { theme } = useTheme();

  const isDisabled = disabled || loading;

  const base: ViewStyle = {
    height: 48,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    opacity: isDisabled ? 0.6 : 1,
    width: fullWidth ? "100%" : undefined,
  };

  const variantStyle: ViewStyle =
    variant === "primary"
      ? { backgroundColor: theme.colors.primary }
      : variant === "outline"
      ? {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        }
      : { backgroundColor: "transparent" };

  const textColor =
    variant === "primary" ? theme.colors.primaryText : theme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[base, variantStyle, styles.pressable, style]}
    >
      {loading ? <ActivityIndicator /> : null}
      <Text
        weight="600"
        color={variant === "primary" ? "text" : "primary"}
        style={{ color: textColor }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    // тут можна додати легку тінь потім, якщо захочеш
  },
});
