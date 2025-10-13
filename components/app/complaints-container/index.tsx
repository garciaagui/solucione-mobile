import { StyleSheet, View } from 'react-native'

import { Complaint } from '@/types/complaint'

import ComplaintCard from './complaint-card'
import ComplaintCardSkeleton from './complaint-card-skeleton'
import ComplaintsEmptyState from './complaints-empty-state'

interface Props {
  isLoading: boolean
  complaints?: Complaint[]
}

export default function ComplaintsContainer({ isLoading, complaints }: Props) {
  const renderContent = () => {
    if (isLoading) {
      return [1, 2, 3, 4].map(item => <ComplaintCardSkeleton key={item} />)
    }

    if (!complaints || complaints.length === 0) {
      return <ComplaintsEmptyState />
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
