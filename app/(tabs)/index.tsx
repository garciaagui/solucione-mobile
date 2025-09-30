import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Text, ThemedView } from '@/components/ui'

export default function HomeScreen() {
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
          <Link href="/sign-in">
            <Text weight="semibold">Sign in</Text>
          </Link>
        </View>
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
