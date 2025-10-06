export type ThemeMode = 'system' | 'light' | 'dark'

export interface ThemeColors {
  background: string
  backgroundAlt: string
  border: string
  borderError: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textError: string
}

export interface IconProps {
  color: string
  size: number
  className?: string
}
