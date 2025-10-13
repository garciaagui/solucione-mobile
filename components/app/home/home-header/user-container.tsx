import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { User } from '@/types/user'

interface Props {
  user: User
}

export default function UserContainer({ user }: Props) {
  const { name, avatar } = user
  const router = useRouter()

  const { colors } = useTheme()
  const { backgroundAlt } = colors

  const handlePress = () => {
    router.push('/profile')
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}>
      <View style={[styles.nameContainer, { backgroundColor: backgroundAlt }]}>
        <Text size="sm" weight="medium" variant="primary">
          {name}
        </Text>
      </View>

      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
        contentFit="cover"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
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
