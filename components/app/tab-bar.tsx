import { RelativePathString, useRouter } from 'expo-router'
import { ElementType } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import { HomeIcon, LibraryIcon, UserIcon } from '@/components/icons'
import { useTheme } from '@/contexts/theme-context'
import { IconProps, ThemeColors } from '@/types/ui'

import { Text } from '../ui'

interface TabBarProps {
  state: {
    index: number
    routes: {
      key: string
      name: string
    }[]
  }
}

type TabRoute = {
  name: string
  label: string
  icon: ElementType<IconProps>
}

const TABS: TabRoute[] = [
  {
    name: '/(tabs)/profile',
    label: 'Perfil',
    icon: UserIcon
  },

  {
    name: '/(tabs)/',
    label: 'Início',
    icon: HomeIcon
  },
  {
    name: '/(tabs)/complaints',
    label: 'Reclamações',
    icon: LibraryIcon
  }
]

export default function TabBar({ state }: TabBarProps) {
  const router = useRouter()

  const { colors } = useTheme()
  const { primary, textTertiary } = colors
  const styles = createTabBarStyles(colors)

  return (
    <View style={styles.container}>
      {TABS.map(({ name, label, icon }, index) => {
        const Icon = icon
        const isActive = state.index === index

        return (
          <Pressable
            key={name}
            style={styles.tabContainer}
            onPress={() => router.push(name as RelativePathString)}>
            <View style={styles.tab}>
              {isActive && <View style={styles.activeIndicator} />}

              <Icon color={isActive ? primary : textTertiary} size={22} />

              <Text
                variant={isActive ? 'primary' : 'tertiary'}
                weight="semibold"
                size="xs">
                {label}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

const createTabBarStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopWidth: 0.5,
      borderTopColor: colors.border,
      flexDirection: 'row',
      height: Platform.select({
        ios: 90,
        android: 74
      }),
      marginTop: Platform.select({
        ios: -40,
        android: 0
      })
    },
    tabContainer: {
      flex: 1,
      paddingBottom: Platform.select({
        ios: 18,
        android: 0
      })
    },
    tab: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      gap: 4
    },
    activeIndicator: {
      backgroundColor: colors.primary,
      position: 'absolute',
      top: -1,
      width: 50,
      height: 3
    }
  })
}
