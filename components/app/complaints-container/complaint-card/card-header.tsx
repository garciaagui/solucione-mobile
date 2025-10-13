import { Image } from 'expo-image'
import { ComponentType } from 'react'
import { StyleSheet, View } from 'react-native'

import { CheckIcon, ClockCircleIcon, LoaderIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { Status } from '@/types/shared'
import { IconProps, ThemeColors } from '@/types/ui'
import { User } from '@/types/user'

interface Props {
  user: User
  status: Status
}

interface StatusBadgeProps {
  backgroundColor: string
  textColor: string
  borderColor: string
  icon: ComponentType<IconProps>
}

function getStatusBadgeProps(
  status: Status,
  colors: ThemeColors
): StatusBadgeProps {
  switch (status) {
    case 'Aberto':
      return {
        backgroundColor: `${colors.primary}15`,
        borderColor: `${colors.primary}40`,
        textColor: colors.primary,
        icon: ClockCircleIcon
      }
    case 'Andamento':
      return {
        backgroundColor: `${colors.info}15`,
        borderColor: `${colors.info}40`,
        textColor: colors.info,
        icon: LoaderIcon
      }
    case 'Finalizado':
      return {
        backgroundColor: `${colors.success}15`,
        borderColor: `${colors.success}40`,
        textColor: colors.success,
        icon: CheckIcon
      }
    default:
      return {
        backgroundColor: `${colors.textTertiary}15`,
        borderColor: `${colors.textTertiary}40`,
        textColor: colors.textTertiary,
        icon: ClockCircleIcon
      }
  }
}

function StatusBadge({ status }: { status: Status }) {
  const { colors } = useTheme()
  const {
    backgroundColor,
    borderColor,
    textColor,
    icon: Icon
  } = getStatusBadgeProps(status, colors)

  return (
    <View style={[styles.statusContainer, { backgroundColor, borderColor }]}>
      <Icon size={12} color={textColor} />
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2
  }
})
