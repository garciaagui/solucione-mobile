import { StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui'

export default function HomeHeaderSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={100} height={28} rounded />
      <Skeleton width={36} height={36} rounded />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2
  }
})
