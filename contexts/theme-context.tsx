import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useColorScheme } from 'react-native'

import { THEME_STORAGE_KEY } from '@/constants/local-storage-keys'
import { Colors } from '@/constants/theme'
import { ThemeColors, ThemeMode } from '@/types/ui'

type ColorScheme = 'light' | 'dark'

interface ThemeContextType {
  colors: ThemeColors
  isDark: boolean
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
}

const validThemeModes: ThemeMode[] = ['system', 'light', 'dark']

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeModeState] = useState<ThemeMode>('system')

  const systemColorScheme = useColorScheme()

  const colorScheme: ColorScheme =
    themeState === 'system'
      ? (systemColorScheme ?? 'light')
      : (themeState as ColorScheme)

  const isDark = colorScheme === 'dark'
  const colors = isDark ? Colors.dark : Colors.light

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
        if (savedTheme && validThemeModes.includes(savedTheme as ThemeMode)) {
          setThemeModeState(savedTheme as ThemeMode)
        }
      } catch (error) {
        console.error('Error loading theme preference:', error)
      }
    }

    loadThemePreference()
  }, [])

  const setThemeMode = async (newTheme: ThemeMode) => {
    const previousThemeMode = themeState
    setThemeModeState(newTheme)

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.error('Error saving theme preference:', error)
      setThemeModeState(previousThemeMode)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: themeState,
        setTheme: setThemeMode,
        isDark,
        colors
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
