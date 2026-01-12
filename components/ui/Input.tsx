// components/ui/Input.tsx
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = TextInputProps & {
  containerStyle?: ViewStyle | ViewStyle[];
};

export default function Input({ style, containerStyle, ...rest }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrap, containerStyle]}>
      <TextInput
        {...rest}
        placeholderTextColor={theme.colors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.inputBg,
            borderColor: theme.colors.inputBorder,
            borderRadius: theme.radius.md,
            color: theme.colors.text,
          },
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
  input: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 16,
  },
});
