// components/ui/Text.tsx
import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Variant = "title" | "subtitle" | "body" | "caption";
type Weight = "400" | "500" | "600" | "700";

type Props = RNTextProps & {
  variant?: Variant;
  weight?: Weight;
  color?: "text" | "muted" | "primary" | "danger" | "success";
  center?: boolean;
};

export default function Text({
  variant = "body",
  weight = "400",
  color = "text",
  center,
  style,
  ...rest
}: Props) {
  const { theme } = useTheme();

  const resolvedColor =
    color === "text"
      ? theme.colors.text
      : color === "muted"
      ? theme.colors.mutedText
      : color === "primary"
      ? theme.colors.primary
      : color === "danger"
      ? theme.colors.danger
      : theme.colors.success;

  return (
    <RNText
      {...rest}
      style={[
        {
          color: resolvedColor,
          fontWeight: weight,
          textAlign: center ? "center" : "auto",
        },
        variant === "title" ? styles.title : undefined,
        variant === "subtitle" ? styles.subtitle : undefined,
        variant === "body" ? styles.body : undefined,
        variant === "caption" ? styles.caption : undefined,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, lineHeight: 34 },
  subtitle: { fontSize: 18, lineHeight: 24 },
  body: { fontSize: 16, lineHeight: 22 },
  caption: { fontSize: 13, lineHeight: 18 },
});
