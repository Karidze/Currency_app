// components/AuthForm.tsx
import { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { supabase } from '../lib/supabase'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signUp() {
  if (!email || !password) {
    alert("Please enter both email and password")
    return
  }

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    alert("Registration failed: " + error.message)
    return
  }

  const userId = data?.user?.id
  if (userId) {
    const { error: profileError } = await supabase.from('profiles').insert({
      user_id: userId,
      first_name: '',
      last_name: '',
      balance: 0,
      created_at: new Date(),
    })
    if (profileError) {
      alert("Profile creation failed: " + profileError.message)
      return
    }
  }

    alert("Registration successful!")
    setEmail('')
    setPassword('')
    }

    async function signIn() {
    if (!email || !password) {
        alert("Please enter both email and password")
        return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
        alert("Login failed: " + error.message)
        return
    }

    alert("Login successful!")
    setEmail('')
    setPassword('')
    }


  return (
    <View style={styles.authBox}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign up or log in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>

      <Pressable style={styles.buttonOutline} onPress={signIn}>
        <Text style={styles.buttonOutlineText}>Log in</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  authBox: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonOutlineText: {
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
})

