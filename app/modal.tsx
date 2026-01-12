import { Link } from "expo-router";
import { View } from "react-native";

// ✅ new UI
import { Button, Card, Screen, Text } from "../components/ui";
import { useTheme } from "../hooks/useTheme";

export default function ModalScreen() {
  const { theme } = useTheme();

  return (
    <Screen>
      <View
        style={{ flex: 1, justifyContent: "center", gap: theme.spacing.lg }}
      >
        <Card padding="lg" style={{ gap: theme.spacing.md }}>
          <Text variant="title" weight="700" center>
            This is a modal
          </Text>

          <Text color="muted" center>
            You can close it or go back to home.
          </Text>

          <Link href="/" dismissTo asChild>
            <View>
              <Button title="Go to home screen" fullWidth />
            </View>
          </Link>
        </Card>
      </View>
    </Screen>
  );
}
