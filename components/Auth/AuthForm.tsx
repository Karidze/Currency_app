import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Card, Input, Text } from "../ui";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert("Registration failed: " + error.message);
      return;
    }

    const userId = data?.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: userId,
        first_name: "",
        last_name: "",
        balance: 0,
        created_at: new Date(),
      });
      if (profileError) {
        alert("Profile creation failed: " + profileError.message);
        return;
      }
    }

    alert("Registration successful!");
    setEmail("");
    setPassword("");
  }

  async function signIn() {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    alert("Login successful!");
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.wrap}>
      <Card padding="lg" style={styles.card}>
        <Text variant="title" weight="700" center>
          Welcome
        </Text>
        <Text color="muted" center style={styles.sub}>
          Sign up or log in to continue
        </Text>

        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Sign up"
            variant="primary"
            onPress={signUp}
            fullWidth
          />
          <Button title="Log in" variant="outline" onPress={signIn} fullWidth />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: "center" },
  card: { gap: 12 },
  sub: { marginBottom: 8 },
  form: { gap: 12 },
});
