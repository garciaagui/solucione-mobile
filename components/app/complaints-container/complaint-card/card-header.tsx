import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { Status } from '@/types/shared'
import { ThemeColors } from '@/types/ui'
import { User } from '@/types/user'

interface Props {
  user: User
  status: Status
}

interface StatusStyle {
  backgroundColor: string
  textColor: string
  borderColor: string
}

function getStatusStyle(status: Status, colors: ThemeColors): StatusStyle {
  switch (status) {
    case 'Aberto':
      return {
        backgroundColor: `${colors.primary}15`,
        borderColor: `${colors.primary}40`,
        textColor: colors.primary
      }
    case 'Andamento':
      return {
        backgroundColor: `${colors.info}15`,
        borderColor: `${colors.info}40`,
        textColor: colors.info
      }
    case 'Finalizado':
      return {
        backgroundColor: `${colors.success}15`,
        borderColor: `${colors.success}40`,
        textColor: colors.success
      }
    default:
      return {
        backgroundColor: `${colors.textTertiary}15`,
        borderColor: `${colors.textTertiary}40`,
        textColor: colors.textTertiary
      }
  }
}

function StatusBadge({ status }: { status: Status }) {
  const { colors } = useTheme()
  const { backgroundColor, borderColor, textColor } = getStatusStyle(
    status,
    colors
  )

  return (
    <View style={[styles.statusContainer, { backgroundColor, borderColor }]}>
      <Text size="xs" weight="medium" color={textColor}>
        {status}
      </Text>
    </View>
  )
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
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 999
  },
  statusContainer: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2
  }
})
