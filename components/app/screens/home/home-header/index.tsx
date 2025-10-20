import { StyleSheet, View } from 'react-native'

import { Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'

import HomeHeaderSkeleton from './home-header-skeleton'
import LoginContainer from './login-container'
import UserContainer from './user-container'

export default function HomeHeader() {
  const { user, isLoading } = useAuth()

  const renderContent = () => {
    if (isLoading) {
      return <HomeHeaderSkeleton />
    }

    if (user) {
      return <UserContainer user={user} />
    }
    return <LoginContainer />
  }

  return (
    <View style={styles.container}>
      <Text size="2xl" weight="bold" variant="primary">
        Solucione
      </Text>

      {renderContent()}
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
