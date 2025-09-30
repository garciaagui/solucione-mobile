import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Platform, StyleSheet } from 'react-native'

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
      <ThemedView style={styles.titleContainer}>
        <Text size="3xl" weight="bold">
          Welcome!
        </Text>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text size="lg">Step 1: Try it</Text>
        <Text size="md">
          Edit{' '}
          <Text size="md" weight="semibold">
            app/(tabs)/index.tsx
          </Text>{' '}
          to see changes. Press{' '}
          <Text size="md" weight="semibold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <Text size="lg">Step 2: Explore</Text>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert('Action pressed')}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <Text size="md">
          Tap the Explore tab to learn more about what&apos;s included in this
          starter app.
        </Text>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Text size="lg">Step 3: Get a fresh start</Text>
        <Text size="md">
          When you&apos;re ready, run{' '}
          <Text size="md" weight="semibold">
            npm run reset-project
          </Text>{' '}
          to get a fresh{' '}
          <Text size="md" weight="semibold">
            app
          </Text>{' '}
          directory. This will move the current{' '}
          <Text size="md" weight="semibold">
            app
          </Text>{' '}
          to{' '}
          <Text size="md" weight="semibold">
            app-example
          </Text>
          .
        </Text>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
})
