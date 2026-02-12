import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  // Добавляем (string & {}) — это хак для TS, чтобы он предлагал варианты, но разрешал любой текст
  color?: "text" | "muted" | "primary" | "white" | (string & {}); 
  style?: StyleProp<TextStyle>;
};

export default function Icon({
  name,
  size = 20,
  color = "muted",
  style,
}: Props) {
  const { theme } = useTheme();

  // Логика выбора цвета
  let resolvedColor: string;

  switch (color) {
    case "text":
      resolvedColor = theme.colors.text;
      break;
    case "primary":
      resolvedColor = theme.colors.primary;
      break;
    case "muted":
      resolvedColor = theme.colors.mutedText;
      break;
    case "white":
      resolvedColor = "#FFFFFF"; // Явно задаем белый
      break;
    default:
      // Если передали hex (#fff) или название цвета (red), используем его напрямую
      resolvedColor = color; 
  }

  return <FontAwesome name={name} size={size} color={resolvedColor} style={style} />;
}