import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '@/contexts/theme-context'

export default function AuthLayout() {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          fullScreenGestureEnabled: true
        }}>
        <Stack.Screen name="sign-in" />
      </Stack>
    </SafeAreaView>
  )
}
