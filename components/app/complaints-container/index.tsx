import { StyleSheet, View } from 'react-native'

import { Complaint } from '@/types/complaint'

import ComplaintCard from './complaint-card'
import ComplaintCardSkeleton from './complaint-card-skeleton'
import ComplaintsEmptyContainer from './complaints-empty-container'

interface Props {
  emptyMessage: string
  isLoading: boolean
  complaints?: Complaint[]
}

export default function ComplaintsContainer({
  emptyMessage,
  isLoading,
  complaints
}: Props) {
  const renderContent = () => {
    if (isLoading) {
      return [1, 2, 3, 4].map(item => <ComplaintCardSkeleton key={item} />)
    }

    if (!complaints || complaints.length === 0) {
      return <ComplaintsEmptyContainer description={emptyMessage} />
    }

    return complaints.map(complaint => (
      <ComplaintCard key={complaint.id} complaint={complaint} />
    ))
  }

  return <View style={styles.container}>{renderContent()}</View>
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
    paddingBottom: 32,
    paddingTop: 24
  }
})
