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
      <View style={{ gap: 4 }}>
        <Skeleton width={300} height={26} />
        <Skeleton width="100%" height={66} />
      </View>

      <View style={styles.locationContainer}>
        <Skeleton width={100} height={24} />
        <Skeleton width="100%" height={44} />
      </View>
    </View>
  )
}

function ImageSkeleton() {
  return <Skeleton width="100%" height={250} />
}

export default function ComplaintDetailsSkeleton() {
  return (
    <View>
      <HeaderSkeleton />
      <ContentSkeleton />
      <ImageSkeleton />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start'
  },
  contentContainer: {
    gap: 4,
    marginBottom: 24
  },
  locationContainer: {
    gap: 4,
    marginTop: 12
  }
})
