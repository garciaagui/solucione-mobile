import { StyleSheet, View } from 'react-native'

import StatusBadge from '@/components/app/status-badge'
import { Text, UserAvatar } from '@/components/ui'
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
        <UserAvatar avatarUrl={avatar} size={28} />
        <Text size="sm" weight="semibold" variant="primary">
          {name}
        </Text>
      </View>

      <StatusBadge status={status} />
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
  }
})
