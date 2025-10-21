import { useMemo } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'

import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void
  loading?: boolean
  size?: 'large' | 'default' | 'small'
  variant?: 'primary' | 'danger' | 'outline'
}

export default function Button({
  children,
  style,
  disabled,
  onPress,
  loading = false,
  size = 'default',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const { colors } = useTheme()

  const styles = useMemo(() => createStyles(colors), [colors])
  const isDisabled = disabled || loading

  const buttonStyles = [
    styles.button,
    styles[size],
    styles[variant],
    isDisabled && styles.disabled,
    style
  ]

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`]
  ]

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={buttonStyles}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={styles[`${variant}Text`].color} />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)'
    },
    text: {
      fontWeight: '600'
    },
    disabled: {
      opacity: 0.5
    },

    // Size styles
    large: {
      paddingVertical: 10,
      paddingHorizontal: 16
    },
    default: {
      paddingVertical: 8,
      paddingHorizontal: 12
    },
    small: {
      paddingVertical: 4,
      paddingHorizontal: 12
    },

    // Variant styles
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary
    },
    danger: {
      backgroundColor: colors.error,
      borderColor: colors.error
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.border
    },

    // Size text styles
    largeText: {
      fontSize: 16,
      lineHeight: 24
    },
    defaultText: {
      fontSize: 14,
      lineHeight: 20
    },
    smallText: {
      fontSize: 12,
      lineHeight: 18
    },

    // Variant text styles
    primaryText: {
      color: colors.background
    },
    dangerText: {
      color: '#FFF'
    },
    outlineText: {
      color: colors.primary
    }
  })
