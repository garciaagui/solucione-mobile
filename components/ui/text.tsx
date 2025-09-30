import { useMemo } from 'react'
import { Text as RNText, StyleSheet, TextProps } from 'react-native'

import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

interface Props extends TextProps {
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  variant?: 'primary' | 'secondary'
}

export default function Text({
  children,
  color,
  size = 'sm',
  weight = 'regular',
  variant = 'primary',
  style,
  ...rest
}: Props) {
  const { colors } = useTheme()

  const styles = useMemo(() => createTextStyles(colors), [colors])

  const textStyles = [
    styles[size],
    styles[weight],
    styles[variant],
    color && { color }, // Custom color overrides variant
    style
  ]

  return (
    <RNText style={textStyles} {...rest}>
      {children}
    </RNText>
  )
}

const createTextStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    // Size
    xs: {
      fontSize: 12,
      lineHeight: 18
    },
    sm: {
      fontSize: 14,
      lineHeight: 20
    },
    md: {
      fontSize: 16,
      lineHeight: 24
    },
    lg: {
      fontSize: 18,
      lineHeight: 28
    },
    xl: {
      fontSize: 20,
      lineHeight: 30
    },
    '2xl': {
      fontSize: 24,
      lineHeight: 32
    },
    '3xl': {
      fontSize: 30,
      lineHeight: 38
    },

    // Weight
    regular: {
      fontWeight: '400'
    },
    medium: {
      fontWeight: '500'
    },
    semibold: {
      fontWeight: '600'
    },
    bold: {
      fontWeight: '700'
    },

    // Text color by variant
    primary: {
      color: theme.textPrimary
    },
    secondary: {
      color: theme.textSecondary
    }
  })
