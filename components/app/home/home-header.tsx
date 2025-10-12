import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { LogInIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'

interface UserContainerProps {
  username: string
  onPress: () => void
}

interface LoginContainerProps {
  onPress: () => void
}

function UserContainer({ username, onPress }: UserContainerProps) {
  // DiceBear url for avatar
  const avatarUrl = 'https://api.dicebear.com/9.x/thumbs/svg?seed=Avery'

  const { colors } = useTheme()
  const { backgroundAlt } = colors

  return (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.nameContainer, { backgroundColor: backgroundAlt }]}>
        <Text size="sm" weight="medium" variant="primary">
          {username}
        </Text>
      </View>

      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
        contentFit="cover"
      />
    </TouchableOpacity>
  )
}

function LoginContainer({ onPress }: LoginContainerProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={styles.loginContainer}>
      <LogInIcon color={colors.textPrimary} size={20} />
      <Text size="md" variant="primary" weight="bold">
        Entrar
      </Text>
    </TouchableOpacity>
  )
}

export default function HomeHeader() {
  const { user } = useAuth()
  const router = useRouter()

  const handleUserProfilePress = () => {
    router.push('/profile')
  }

  const handleLoginPress = () => {
    router.push('/sign-in')
  }

  return (
    <View style={styles.container}>
      <Text size="2xl" weight="bold" variant="primary">
        Solucione
      </Text>

      {user ? (
        <UserContainer username={user.name} onPress={handleUserProfilePress} />
      ) : (
        <LoginContainer onPress={handleLoginPress} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between'
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8
  },
  avatar: {
    borderRadius: 999,
    width: 36,
    height: 36
  },
  nameContainer: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    marginRight: -24,
    paddingLeft: 12,
    paddingRight: 24,
    paddingVertical: 6
  }
})
