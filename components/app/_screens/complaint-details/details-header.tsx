import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { ChevronBackIcon } from '@/components/icons'
import { Text, UserAvatar } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { User } from '@/types/user'

interface Props {
  user: User
  createdAt: string
}

const formatCreatedDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

export default function DetailsHeader({ user, createdAt }: Props) {
  const router = useRouter()

  const { colors } = useTheme()
  const { avatar, name } = user

  const handleGoBack = () => {
    router.back()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <ChevronBackIcon color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.userContainer}>
        <UserAvatar avatarUrl={avatar} size={40} />

        <View>
          <Text weight="semibold" variant="primary">
            {name}
          </Text>
          <Text variant="secondary">
            Postado em {formatCreatedDate(createdAt)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-start'
  }
})
