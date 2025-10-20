import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { UserUnauthenticatedIcon } from '@/components/icons'
import { Button, Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function UnauthenticatedContainer() {
  const router = useRouter()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <UserUnauthenticatedIcon size={40} color={colors.textPrimary} />
      </View>

      <View style={styles.content}>
        <View>
          <Text
            size="lg"
            weight="semibold"
            variant="primary"
            style={styles.title}>
            Você não está autenticado
          </Text>
          <Text size="sm" variant="secondary" style={styles.description}>
            Faça login para continuar.
          </Text>
        </View>

        <Button onPress={() => router.push('/sign-in')}>Ir para login</Button>
      </View>
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      paddingVertical: 24,
      paddingHorizontal: 64
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      borderWidth: 2,
      borderColor: colors.border,
      width: 90,
      height: 90
    },
    content: {
      alignItems: 'center',
      gap: 16
    },
    title: {
      textAlign: 'center',
      lineHeight: 24
    },
    description: {
      textAlign: 'center'
    }
  })
