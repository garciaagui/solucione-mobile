import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { PlusIcon } from '@/components/icons'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function NewComplaintButton() {
  const { user } = useAuth()
  const router = useRouter()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const handleCreateComplaint = () => {
    router.push('/new-complaint')
  }

  if (!user || user.role === 'admin') return null

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleCreateComplaint}
      activeOpacity={0.8}>
      <PlusIcon color={colors.background} size={28} />
    </TouchableOpacity>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 28,
      bottom: 56,
      elevation: 4,
      height: 56,
      justifyContent: 'center',
      position: 'absolute',
      right: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      width: 56
    }
  })
