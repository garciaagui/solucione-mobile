import { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HomeHeader } from '@/components/app/_screens/home'
import ComplaintsContainer from '@/components/app/complaints-container'
import { RefreshControl } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { useComplaints } from '@/hooks/use-complaints'
import { ThemeColors } from '@/types/ui'

export default function HomeScreen() {
  const { data, isLoading, refetch } = useComplaints()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl isLoading={isLoading} handleRefetch={refetch} />
        }
        style={styles.container}>
        <HomeHeader />
        <ComplaintsContainer isLoading={isLoading} complaints={data} />
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
