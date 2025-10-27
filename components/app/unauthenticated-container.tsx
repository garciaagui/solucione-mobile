import { Link } from 'expo-router'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { UserUnauthenticatedIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

interface Props {
  description?: string
}

export default function UnauthenticatedContainer({
  description = 'Faça login para continuar.'
}: Props) {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <UserUnauthenticatedIcon size={40} color={colors.textPrimary} />
      </View>

      <View style={styles.content}>
        <View>
          <Text size="xl" weight="bold" style={styles.title}>
            Você não está autenticado
          </Text>
          <Text size="md" variant="secondary" style={styles.description}>
            {description}
          </Text>
        </View>

        <Text size="md">
          Faça o{' '}
          <Link href="/sign-in" asChild>
            <Text size="md" weight="bold" style={styles.link}>
              login
            </Text>
          </Link>{' '}
          ou{' '}
          <Link href="/sign-up" asChild>
            <Text size="md" weight="bold" style={styles.link}>
              cadastre-se
            </Text>
          </Link>
        </Text>
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
      paddingHorizontal: 56
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
    },
    link: {
      textDecorationLine: 'underline'
    }
  })
