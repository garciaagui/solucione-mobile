import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { CUSTOM_TOAST_CONFIG } from '@/components/custom-toast'
import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider, useTheme } from '@/contexts/theme-context'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)'
}

function StatusBar() {
  const { isDark } = useTheme()

  return <ExpoStatusBar style={isDark ? 'light' : 'dark'} />
}

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              gestureDirection: 'horizontal'
            }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="complaint-details/[id]" />
            <Stack.Screen
              name="new-complaint"
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
              }}
            />
          </Stack>
          <StatusBar />
          <Toast
            autoHide={true}
            position="top"
            topOffset={60}
            visibilityTime={3000}
            config={CUSTOM_TOAST_CONFIG}
          />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
