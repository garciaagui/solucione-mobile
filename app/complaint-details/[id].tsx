import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import NewComplaintButton from '@/components/app/new-complaint-button'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { useComplaintDetails } from '@/hooks/use-complaint-details'
import { ThemeColors } from '@/types/ui'

export default function ComplaintDetailsScreen() {
  const { id } = useLocalSearchParams()
  const { data } = useComplaintDetails(id as string)

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Text size="lg" weight="semibold" variant="primary">
          Detalhes da Reclamação - {id}
        </Text>
        <Text size="md" weight="regular" variant="primary">
          {data?.description}
        </Text>
      </ScrollView>

      <NewComplaintButton />
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
