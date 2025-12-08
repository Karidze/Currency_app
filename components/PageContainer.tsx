// components/PageContainer.tsx
import { StyleSheet } from 'react-native'
import { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PageContainer({ children }: { children: ReactNode }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})
