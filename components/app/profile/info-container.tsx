import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'
import { User } from '@/types/user'

interface InfoContainerProps {
  user: User
}

interface InfoItemProps {
  label: string
  value: string
  isLast?: boolean
}

function InfoItem({ label, value, isLast }: InfoItemProps) {
  const { colors } = useTheme()
  const styles = useMemo(() => createItemStyles(colors), [colors])

  const itemStyles = [styles.item, !isLast && styles.notLastItem]

  return (
    <View style={itemStyles}>
      <Text size="md" weight="medium" variant="primary">
        {label}
      </Text>
      <Text size="md" weight="regular" variant="primary">
        {value}
      </Text>
    </View>
  )
}

export default function InfoContainer({ user }: InfoContainerProps) {
  const { name, email } = user

  const { colors } = useTheme()
  const styles = useMemo(() => createContainerStyles(colors), [colors])

  return (
    <View style={styles.container}>
      <Text size="xl" weight="bold" variant="primary">
        Meu Perfil
      </Text>

      <View style={styles.content}>
        <InfoItem label="Nome" value={name} />
        <InfoItem label="E-mail" value={email} isLast />
      </View>
    </View>
  )
}

const createItemStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between'
    },
    notLastItem: {
      borderBottomWidth: 1,
      borderBottomColor: `${colors.backgroundAlt}80`,
      paddingBottom: 16
    }
  })

const createContainerStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 16
    },
    content: {
      gap: 8,
      backgroundColor: `${colors.backgroundAlt}40`,
      borderRadius: 12,
      padding: 16
    }
  })
