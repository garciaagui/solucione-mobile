import { useRouter } from 'expo-router'
import { ElementType, useMemo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { LibraryAddIcon, LibraryIcon, LogOutIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { IconProps, ThemeColors } from '@/types/ui'

interface ActionItemProps {
  icon: ElementType<IconProps>
  label: string
  isLast?: boolean
  onPress: () => void
}

function ActionItem({ icon: Icon, label, isLast, onPress }: ActionItemProps) {
  const { colors } = useTheme()
  const styles = useMemo(() => createItemStyles(colors), [colors])

  const itemStyles = [styles.item, !isLast && styles.notLastItem]

  return (
    <TouchableOpacity style={itemStyles} onPress={onPress}>
      <Icon color={colors.textPrimary} size={18} />
      <Text size="md" weight="medium" variant="primary">
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default function ActionsContainer() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const isAdmin = user?.role === 'admin'

  const { colors } = useTheme()
  const styles = useMemo(() => createContainerStyles(colors), [colors])

  const handleLogout = () => {
    logout()
  }

  const handleNavigateToComplaints = () => {
    router.push('/complaints')
  }

  const handleNavigateToNewComplaint = () => {
    router.push('/new-complaint')
  }

  return (
    <View style={styles.container}>
      <Text size="xl" weight="bold" variant="primary">
        Ações
      </Text>

      <View style={styles.content}>
        <ActionItem
          icon={LibraryIcon}
          label="Minhas reclamações"
          onPress={handleNavigateToComplaints}
        />

        {!isAdmin && (
          <ActionItem
            icon={LibraryAddIcon}
            label="Nova reclamação"
            onPress={handleNavigateToNewComplaint}
          />
        )}

        <ActionItem
          icon={LogOutIcon}
          label="Sair da conta"
          onPress={handleLogout}
          isLast
        />
      </View>
    </View>
  )
}

const createItemStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16
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
      gap: 8
    },
    content: {
      gap: 8,
      backgroundColor: `${colors.backgroundAlt}40`,
      borderRadius: 12,
      padding: 16
    }
  })
