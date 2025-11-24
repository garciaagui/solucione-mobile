import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { XIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'

interface Props {
  title: string
  subtitle: string
  handleClose: () => void
}

export default function ModalHeader({ title, subtitle, handleClose }: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text size="lg" weight="bold" variant="primary">
          {title}
        </Text>
        <Text size="sm" variant="tertiary">
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <XIcon color={colors.textPrimary} size={24} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  closeButton: {
    paddingVertical: 4
  },
  textContainer: {
    flex: 1,
    flexShrink: 1
  }
})
