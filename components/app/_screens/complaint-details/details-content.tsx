import { StyleSheet, View } from 'react-native'

import StatusBadge from '@/components/app/status-badge'
import { Text } from '@/components/ui'
import { Status } from '@/types/shared'

interface Props {
  title: string
  description: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference?: string | null
  status: Status
}

export default function DetailsContent({
  title,
  description,
  street,
  neighborhood,
  zipCode,
  addressReference,
  status
}: Props) {
  const fullAddress = `${street}, ${neighborhood} - CEP: ${zipCode}`

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text size="xl" weight="bold" variant="primary" style={styles.title}>
          {title}
        </Text>
        <StatusBadge status={status} />
      </View>

      <View>
        <Text size="md" weight="semibold" variant="primary">
          Descrição
        </Text>
        <Text size="md" variant="secondary" style={styles.text}>
          {description}
        </Text>
      </View>

      <View>
        <Text size="md" weight="semibold" variant="primary">
          Localização
        </Text>
        <Text size="md" variant="secondary" style={styles.text}>
          {fullAddress}
        </Text>
        {addressReference && (
          <Text size="sm" variant="tertiary" style={styles.reference}>
            Referência: {addressReference}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 8
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  title: {
    lineHeight: 26,
    flex: 1,
    marginRight: 12
  },
  text: {
    lineHeight: 22
  },
  reference: {
    marginTop: 2
  }
})
