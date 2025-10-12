import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'

import LoginContainer from './login-container'
import UserContainer from './user-container'

export default function HomeHeader() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Text size="2xl" weight="bold" variant="primary">
        Solucione
      </Text>

      {user ? <UserContainer username={user.name} /> : <LoginContainer />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between'
  }
})
