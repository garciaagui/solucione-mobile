import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { LogInIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'

export default function LoginContainer() {
  const router = useRouter()
  const { colors } = useTheme()

  const handlePress = () => {
    router.push('/sign-in')
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <LogInIcon color={colors.textPrimary} size={20} />
      <Text size="md" variant="primary" weight="bold">
        Entrar
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  }
})
