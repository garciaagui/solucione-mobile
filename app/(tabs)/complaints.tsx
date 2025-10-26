import { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import UnauthenticatedContainer from '@/components/app/unauthenticated-container'
import { Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function ComplaintsScreen() {
  const { user } = useAuth()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const renderContent = () => {
    if (!user) {
      return (
        <View style={{ paddingTop: 24 }}>
          <UnauthenticatedContainer description="Faça login para acessar suas reclamações." />
        </View>
      )
    }

    return (
      <>
        <Text size="xl" weight="bold" variant="primary">
          Reclamações
        </Text>
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {renderContent()}
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
