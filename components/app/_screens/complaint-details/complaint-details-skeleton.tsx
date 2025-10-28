import { StyleSheet, View } from 'react-native'

import { Skeleton } from '@/components/ui'

function HeaderSkeleton() {
  return (
    <View style={styles.headerContainer}>
      <Skeleton width={24} height={24} rounded />

      <View style={styles.userContainer}>
        <Skeleton width={40} height={40} rounded />

        <View style={{ gap: 4 }}>
          <Skeleton width={140} height={18} />
          <Skeleton width={200} height={18} />
        </View>
      </View>
    </View>
  )
}

function ContentSkeleton() {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Skeleton width={280} height={26} />
        <Skeleton width={80} height={26} />
      </View>

      <View style={styles.section}>
        <Skeleton width={100} height={24} />
        <Skeleton width="100%" height={44} />
      </View>

      <View style={styles.section}>
        <Skeleton width={100} height={24} />
        <Skeleton width="100%" height={44} />
      </View>
    </View>
  )
}

function ImageSkeleton() {
  return <Skeleton width="100%" height={250} />
}

function RepliesSkeleton() {
  return (
    <View style={styles.repliesContainer}>
      <Skeleton width={100} height={24} />
      <Skeleton width="100%" height={100} />
    </View>
  )
}

export default function ComplaintDetailsSkeleton() {
  return (
    <View style={styles.container}>
      <HeaderSkeleton />
      <ContentSkeleton />
      <ImageSkeleton />
      <RepliesSkeleton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start'
  },
  contentContainer: {
    gap: 16,
    marginBottom: 8
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  section: {
    gap: 4
  },
  repliesContainer: {
    gap: 8
  }
})
