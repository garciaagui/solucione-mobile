import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { XIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'

interface Props {
  handleClose: () => void
}

export default function NewComplaintHeader({ handleClose }: Props) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text size="lg" weight="bold" variant="primary">
          Nova Reclamação
        </Text>
        <Text size="sm" variant="tertiary">
          Preencha os campos abaixo para criar uma nova reclamação.
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
