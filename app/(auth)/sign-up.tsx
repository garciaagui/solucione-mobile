import { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function SignUpScreen() {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.header}>
        <Text size="xl" weight="semibold" variant="primary">
          Cadastro
        </Text>
        <Text size="sm" variant="secondary">
          Preencha os campos abaixo para concluir seu cadastro na Solucione
        </Text>
      </View>

      <View style={styles.form}></View>
    </ScrollView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      marginTop: 16
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 96
    },
    form: {
      flex: 1,
      gap: 16
    },
    header: {
      alignItems: 'center',
      marginBottom: 24
    }
  })
