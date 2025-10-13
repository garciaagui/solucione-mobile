import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'

interface Props {
  createdAt: string
  description: string
  title: string
}

const formatCreatedDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

export default function CardContent({ createdAt, description, title }: Props) {
  return (
    <View style={styles.container}>
      <Text size="lg" weight="semibold" variant="primary" numberOfLines={1}>
        {title}
      </Text>

      <Text
        size="sm"
        variant="secondary"
        style={styles.description}
        numberOfLines={2}>
        {description}
      </Text>

      <Text size="xs" variant="tertiary" style={styles.date}>
        {formatCreatedDate(createdAt)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 2
  },
  description: {
    lineHeight: 16
  },
  date: {
    marginTop: 4
  }
})
