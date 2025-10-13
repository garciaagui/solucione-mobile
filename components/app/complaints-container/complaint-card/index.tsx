import { Image } from 'expo-image'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { useTheme } from '@/contexts/theme-context'
import { Complaint } from '@/types/complaint'
import { ThemeColors } from '@/types/ui'

import CardContent from './card-content'
import CardHeader from './card-header'

interface Props {
  complaint: Complaint
}

export default function ComplaintCard({ complaint }: Props) {
  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const { createdAt, description, images, status, title, user } = complaint

  return (
    <View style={styles.container}>
      <CardHeader user={user} status={status} />

      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: images[0] }}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <CardContent
        createdAt={createdAt}
        description={description}
        title={title}
      />
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      gap: 8
    },
    image: {
      width: '100%',
      height: 400
    },
    imageWrapper: {
      marginHorizontal: -24,
      borderWidth: 1,
      borderColor: colors.border
    }
  })
