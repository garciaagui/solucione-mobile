import { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function ProfileScreen() {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Text size="2xl" weight="bold" variant="primary">
          Meu perfil
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
      flex: 1
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 16
    }
  })
