import { ComponentType } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { CogIcon, MoonIcon, SunIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors, ThemeMode } from '@/types/ui'

interface ThemeOption {
  mode: ThemeMode
  label: string
  icon: ComponentType<{ size: number; color: string }>
}

const themeOptions: ThemeOption[] = [
  { mode: 'system', label: 'Sistema', icon: CogIcon },
  { mode: 'light', label: 'Claro', icon: SunIcon },
  { mode: 'dark', label: 'Escuro', icon: MoonIcon }
]

export default function ThemeSwitcher() {
  const { colors, theme, setTheme } = useTheme()
  const styles = createStyles(colors)

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="lg" weight="bold" variant="primary">
          Tema do aplicativo
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {themeOptions.map(({ mode, label, icon }) => {
          const isActive = theme === mode
          const Icon = icon

          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.option,
                isActive ? styles.activeOption : styles.inactiveOption
              ]}
              onPress={() => handleThemeChange(mode)}
              activeOpacity={0.9}>
              <Icon
                size={16}
                color={isActive ? colors.background : colors.textSecondary}
              />
              <Text
                variant="secondary"
                weight="medium"
                size="sm"
                color={isActive ? colors.background : undefined}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 12
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12
    },
    optionsContainer: {
      flexDirection: 'row',
      backgroundColor: `${colors.backgroundAlt}40`,
      borderRadius: 12,
      padding: 4,
      gap: 4
    },
    option: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      borderRadius: 8,
      gap: 6
    },
    activeOption: {
      backgroundColor: colors.primary
    },
    inactiveOption: {
      backgroundColor: 'transparent'
    }
  })
