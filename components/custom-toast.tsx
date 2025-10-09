import { BaseToast, BaseToastProps } from 'react-native-toast-message'

import { useTheme } from '@/contexts/theme-context'

interface Props extends BaseToastProps {
  type: 'success' | 'error'
}

function CustomToast({ type, ...props }: Props) {
  const { colors } = useTheme()

  const borderColor = type === 'success' ? colors.success : colors.error
  const backgroundColor = colors.background
  const text1Color = colors.textPrimary
  const text2Color = colors.textSecondary

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor,
        borderLeftColor: borderColor
      }}
      text1Style={{
        fontSize: 14,
        color: text1Color
      }}
      text2Style={{
        fontSize: 12,
        color: text2Color
      }}
    />
  )
}

export const CUSTOM_TOAST_CONFIG = {
  success: ({ ...props }: BaseToastProps) => (
    <CustomToast type="success" {...props} />
  ),
  error: ({ ...props }: BaseToastProps) => (
    <CustomToast type="error" {...props} />
  )
}
