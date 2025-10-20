import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { AdminIcon } from '@/components/icons'
import { Text, UserAvatar } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'
import { User } from '@/types/user'

interface Props {
  user: User
}

export default function AvatarContainer({ user }: Props) {
  const { avatar, name, role } = user
  const isAdmin = role === 'admin'

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <View style={styles.container}>
      <UserAvatar avatarUrl={avatar} size={96} />
      <Text size="2xl" weight="bold" variant="primary" style={styles.name}>
        {name}
      </Text>

      {isAdmin ? (
        <View style={styles.adminBadge}>
          <AdminIcon size={10} color={colors.primary} />
          <Text size="xs" weight="medium">
            Administrador
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 2,
      marginBottom: 6
    },
    name: {
      marginTop: 4
    },
    adminBadge: {
      alignItems: 'center',
      backgroundColor: colors.backgroundAlt,
      borderRadius: 8,
      flexDirection: 'row',
      gap: 6,
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 2
    }
  })
