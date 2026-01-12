// components/ui/Icon.tsx
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  color?: "text" | "muted" | "primary";
  style?: StyleProp<TextStyle>;
};

export default function Icon({
  name,
  size = 20,
  color = "muted",
  style,
}: Props) {
  const { theme } = useTheme();

  const resolved =
    color === "text"
      ? theme.colors.text
      : color === "primary"
      ? theme.colors.primary
      : theme.colors.mutedText;

  return <FontAwesome name={name} size={size} color={resolved} style={style} />;
}
