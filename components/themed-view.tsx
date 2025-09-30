import { View, type ViewProps } from 'react-native'

import { useTheme } from '@/contexts/theme-context'

export function ThemedView({ style, ...props }: ViewProps) {
  const { colors } = useTheme()
  const backgroundColor = colors.background

  return <View style={[{ backgroundColor }, style]} {...props} />
}
