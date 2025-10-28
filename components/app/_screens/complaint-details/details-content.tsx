import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'

interface Props {
  title: string
  description: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference?: string | null
}

export default function DetailsContent({
  title,
  description,
  street,
  neighborhood,
  zipCode,
  addressReference
}: Props) {
  const fullAddress = `${street}, ${neighborhood} - CEP: ${zipCode}`

  return (
    <View style={styles.container}>
      <Text size="xl" weight="bold" variant="primary">
        {title}
      </Text>

      <Text size="md" variant="secondary">
        {description}
      </Text>

      <View style={styles.locationContainer}>
        <Text size="md" weight="semibold" variant="primary">
          Localização
        </Text>
        <Text size="md" variant="secondary">
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
    gap: 4
  },
  locationContainer: {
    marginTop: 12
  },
  reference: {
    marginTop: 4
  }
})
