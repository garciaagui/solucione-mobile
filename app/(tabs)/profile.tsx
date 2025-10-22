import { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  ActionsContainer,
  AvatarContainer,
  InfoContainer,
  ThemeSwitcher
} from '@/components/app/_screens/profile'
import UnauthenticatedContainer from '@/components/app/unauthenticated-container'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function ProfileScreen() {
  const { user } = useAuth()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const renderContent = () => {
    if (!user) {
      return <UnauthenticatedContainer />
    }

    return (
      <>
        <AvatarContainer user={user} />
        <InfoContainer user={user} />
        <ThemeSwitcher />
        <ActionsContainer />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ gap: 24 }}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.background,
      flex: 1
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 24
    }
  })
