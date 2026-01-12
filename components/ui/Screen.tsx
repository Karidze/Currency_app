// components/ui/Screen.tsx
import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  children: ReactNode;
  padded?: boolean;
  style?: ViewStyle | ViewStyle[];
};

export default function Screen({ children, padded = true, style }: Props) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.base,
        { backgroundColor: theme.colors.background },
        padded
          ? {
              paddingHorizontal: theme.spacing.lg,
              paddingTop: theme.spacing.lg,
            }
          : null,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1 },
});
