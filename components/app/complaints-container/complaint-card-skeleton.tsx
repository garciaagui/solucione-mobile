import { StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui'

function HeaderSkeleton() {
  return (
    <View style={styles.header}>
      <View style={styles.headerUserContainer}>
        <Skeleton width={28} height={28} rounded />
        <Skeleton width={100} height={20} rounded />
      </View>

      <Skeleton width={80} height={18} rounded />
    </View>
  )
}

function ImageSkeleton() {
  return (
    <View style={styles.imageWrapper}>
      <Skeleton width={'100%'} height={400} />
    </View>
  )
}

function ContentSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton width={'75%'} height={28} />
      <Skeleton width={'100%'} height={32} />
      <Skeleton width={200} height={18} style={styles.date} />
    </View>
  )
}

export default function ComplaintCardSkeleton() {
  return (
    <View style={styles.container}>
      <HeaderSkeleton />
      <ImageSkeleton />
      <ContentSkeleton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  imageWrapper: {
    marginHorizontal: -24
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerUserContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start'
  },
  content: {
    gap: 4
  },
  date: {
    marginTop: 4
  }
})
