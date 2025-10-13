import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { Status } from '@/types/shared'
import { User } from '@/types/user'

interface Props {
  user: User
  status: Status
}

export default function CardHeader({ user, status }: Props) {
  const { avatar, name } = user

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
          contentFit="contain"
        />
        <Text size="sm" weight="semibold" variant="primary">
          {name}
        </Text>
      </View>

      <Text size="xs" variant="tertiary">
        {status}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start'
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999
  }
})
