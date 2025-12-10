// components/PageContainer.tsx
import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'

export default function PageContainer({ children }: { children: ReactNode }) {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})
