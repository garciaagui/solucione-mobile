import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Button, Text, ThemedView } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { showErrorToast, showSuccessToast } from '@/functions/toast'

export default function HomeScreen() {
  const { user, logout } = useAuth()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <Text size="3xl" weight="bold">
          Welcome!
        </Text>

        <View>
          <Text weight="semibold">User: {user?.name || 'Não logado'}</Text>

          <Link href="/sign-in" asChild>
            <Text weight="semibold">Sign in</Text>
          </Link>

          <TouchableOpacity onPress={() => logout()}>
            <Text weight="semibold">Logout</Text>
          </TouchableOpacity>
        </View>

        <Button
          onPress={() =>
            showSuccessToast('Success', 'This is a success toast')
          }>
          Teste toast de sucesso
        </Button>
        <Button
          onPress={() => showErrorToast('Error', 'This is a error toast')}>
          Teste toast de erro
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
})
