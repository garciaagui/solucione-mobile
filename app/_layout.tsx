import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { CUSTOM_TOAST_CONFIG } from '@/components/custom-toast'
import { ThemeProvider } from '@/contexts/theme-context'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)'
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      <Toast
        autoHide={true}
        position="top"
        topOffset={60}
        visibilityTime={3000}
        config={CUSTOM_TOAST_CONFIG}
      />
    </ThemeProvider>
  )
}
