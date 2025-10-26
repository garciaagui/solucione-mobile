import { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ComplaintsHeader } from '@/components/app/_screens/complaints'
import ComplaintsContainer from '@/components/app/complaints-container'
import NewComplaintButton from '@/components/app/new-complaint-button'
import UnauthenticatedContainer from '@/components/app/unauthenticated-container'
import { RefreshControl } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { useUserComplaints } from '@/hooks/use-user-complaints'
import { ThemeColors } from '@/types/ui'

export default function ComplaintsScreen() {
  const { user } = useAuth()
  const { data, isLoading, refetch } = useUserComplaints(user?.id)

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
        <ComplaintsHeader userRole={user.role} />
        <ComplaintsContainer
          emptyMessage="Ainda não há reclamações para exibir. Quando houver novas reclamações,
          elas aparecerão aqui."
          isLoading={isLoading}
          complaints={data}
        />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl isLoading={isLoading} handleRefetch={refetch} />
        }
        style={styles.container}>
        {renderContent()}
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
