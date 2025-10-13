import { StyleSheet, View } from 'react-native'

import { Complaint } from '@/types/complaint'

import ComplaintCard from './complaint-card'

interface Props {
  complaints: Complaint[]
}

export default function ComplaintsContainer({ complaints }: Props) {
  return (
    <View style={styles.container}>
      {complaints.map(complaint => (
        <ComplaintCard key={complaint.id} complaint={complaint} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
    paddingBottom: 32,
    paddingTop: 24
  }
})
