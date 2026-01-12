import { Screen, Text } from "../../components/ui";

export default function HomeScreen() {
  return (
    <Screen>
      <Text variant="title" weight="700">
        Home
      </Text>
      <Text color="muted">Your dashboard will be here.</Text>
    </Screen>
  );
}
