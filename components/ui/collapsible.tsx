// components/ui/Collapsible.tsx
import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import Icon from "./Icon";
import Text from "./Text";

type Props = PropsWithChildren & { title: string };

export default function Collapsible({ children, title }: Props) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen((v) => !v)}
        activeOpacity={0.8}
        style={styles.heading}
      >
        <Icon
          name="chevron-right"
          color="muted"
          style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}
        />
        <Text weight="600">{title}</Text>
      </TouchableOpacity>

      {open ? (
        <View
          style={[styles.content, { borderLeftColor: theme.colors.border }]}
        >
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  content: {
    marginTop: 10,
    marginLeft: 10,
    paddingLeft: 12,
    borderLeftWidth: 2,
  },
});
