import { ScrollView } from 'react-native'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'

export default function SignInScreen() {
  const { colors } = useTheme()

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.background }}>
      <Text weight="semibold">Sign in</Text>
    </ScrollView>
  )
}
