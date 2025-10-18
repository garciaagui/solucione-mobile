import { Image } from 'expo-image'
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

interface Props {
  avatarUrl: string
  size?: number
}

export default function UserAvatar({ avatarUrl, size = 36 }: Props) {
  const styles = useMemo(() => createStyles(size), [size])

  return (
    <Image
      source={{ uri: avatarUrl }}
      style={styles.avatar}
      contentFit="cover"
    />
  )
}

const createStyles = (size: number) =>
  StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: 999
    }
  })
