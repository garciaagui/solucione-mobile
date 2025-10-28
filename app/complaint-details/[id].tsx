import { useLocalSearchParams } from 'expo-router'
import { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  ComplaintDetailsSkeleton,
  DetailsContent,
  DetailsHeader,
  ImageContainer
} from '@/components/app/_screens/complaint-details'
import NewComplaintButton from '@/components/app/new-complaint-button'
import { RefreshControl, Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { useComplaintDetails } from '@/hooks/use-complaint-details'
import { ThemeColors } from '@/types/ui'

export default function ComplaintDetailsScreen() {
  const { id } = useLocalSearchParams()
  const { data, isLoading, refetch } = useComplaintDetails(id as string)

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const renderContent = () => {
    if (isLoading) {
      return <ComplaintDetailsSkeleton />
    }

    if (!data) {
      return (
        <View style={styles.errorContainer}>
          <Text size="lg" weight="semibold" variant="primary">
            Reclamação não encontrada
          </Text>
        </View>
      )
    }

    return (
      <>
        <DetailsHeader user={data.user} createdAt={data.createdAt} />
        <DetailsContent
          title={data.title}
          description={data.description}
          street={data.street}
          neighborhood={data.neighborhood}
          zipCode={data.zipCode}
          addressReference={data.addressReference}
        />
        <ImageContainer image={data.images[0]} />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl handleRefetch={refetch} isLoading={isLoading} />
        }>
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
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 32
    }
  })
