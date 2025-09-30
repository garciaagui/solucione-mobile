import { Image } from 'expo-image'
import { Platform, StyleSheet } from 'react-native'

import { ExternalLink } from '@/components/external-link'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Text, ThemedView } from '@/components/ui'
import { Collapsible } from '@/components/ui/collapsible'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Fonts } from '@/constants/theme'

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Text
          size="3xl"
          weight="bold"
          style={{
            fontFamily: Fonts.rounded
          }}>
          Explore
        </Text>
      </ThemedView>
      <Text size="md">
        This app includes example code to help you get started.
      </Text>
      <Collapsible title="File-based routing">
        <Text size="md">
          This app has two screens:{' '}
          <Text size="md" weight="semibold">
            app/(tabs)/index.tsx
          </Text>{' '}
          and{' '}
          <Text size="md" weight="semibold">
            app/(tabs)/explore.tsx
          </Text>
        </Text>
        <Text size="md">
          The layout file in{' '}
          <Text size="md" weight="semibold">
            app/(tabs)/_layout.tsx
          </Text>{' '}
          sets up the tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text size="md" weight="semibold">
            Learn more
          </Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text size="md">
          You can open this project on Android, iOS, and the web. To open the
          web version, press{' '}
          <Text size="md" weight="semibold">
            w
          </Text>{' '}
          in the terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text size="md">
          For static images, you can use the{' '}
          <Text size="md" weight="semibold">
            @2x
          </Text>{' '}
          and{' '}
          <Text size="md" weight="semibold">
            @3x
          </Text>{' '}
          suffixes to provide files for different screen densities
        </Text>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text size="md" weight="semibold">
            Learn more
          </Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Text size="md">
          This template has light and dark mode support. The{' '}
          <Text size="md" weight="semibold">
            useColorScheme()
          </Text>{' '}
          hook lets you inspect what the user&apos;s current color scheme is,
          and so you can adjust UI colors accordingly.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text size="md" weight="semibold">
            Learn more
          </Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text size="md">
          This template includes an example of an animated component. The{' '}
          <Text size="md" weight="semibold">
            components/HelloWave.tsx
          </Text>{' '}
          component uses the powerful{' '}
          <Text size="md" weight="semibold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text size="md">
              The{' '}
              <Text size="md" weight="semibold">
                components/ParallaxScrollView.tsx
              </Text>{' '}
              component provides a parallax effect for the header image.
            </Text>
          )
        })}
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  }
})
