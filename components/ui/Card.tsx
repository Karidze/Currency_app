// components/ui/Card.tsx
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = ViewProps & {
  padding?: "none" | "sm" | "md" | "lg";
};

export default function Card({ style, padding = "md", ...rest }: Props) {
  const { theme } = useTheme();

  const p =
    padding === "none"
      ? 0
      : padding === "sm"
      ? theme.spacing.sm
      : padding === "lg"
      ? theme.spacing.lg
      : theme.spacing.md;

  return (
    <View
      {...rest}
      style={[
        styles.base,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: p,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
