import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Text, ThemedView } from '@/components/ui'

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text size="3xl" weight="bold">
        This is a modal
      </Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text size="md">Go to home screen</Text>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  link: {
    marginTop: 15,
    paddingVertical: 15
  }
})
