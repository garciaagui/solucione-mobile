import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { ClipboardIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function ComplaintsEmptyState() {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ClipboardIcon size={48} color={colors.textPrimary} />
      </View>

      <View style={styles.content}>
        <Text
          size="lg"
          weight="semibold"
          variant="primary"
          style={styles.title}>
          Nenhuma reclamação encontrada
        </Text>
        <Text size="sm" variant="secondary" style={styles.description}>
          Ainda não há reclamações para exibir. Quando houver novas reclamações,
          elas aparecerão aqui.
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
      gap: 8
    },
    title: {
      textAlign: 'center',
      lineHeight: 24
    },
    description: {
      textAlign: 'center'
    }
  })
