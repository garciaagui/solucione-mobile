export type ThemeMode = 'system' | 'light' | 'dark'

export interface ThemeColors {
  background: string
  backgroundAlt: string
  textPrimary: string
  textSecondary: string
}

export interface IconProps {
  color: string
  size: number
  className?: string
}
