import { StyleSheet, View } from 'react-native'

import { CheckIcon, ClockCircleIcon, LoaderIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { Status } from '@/types/shared'
import { ThemeColors } from '@/types/ui'

interface Props {
  status: Status
}

function getStatusBadgeProps(status: Status, colors: ThemeColors) {
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

export default function StatusBadge({ status }: Props) {
  const { colors } = useTheme()
  const {
    backgroundColor,
    borderColor,
    textColor,
    icon: Icon
  } = getStatusBadgeProps(status, colors)

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <Icon size={12} color={textColor} />
      <Text size="xs" weight="medium" color={textColor}>
        {status}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2
  }
})
