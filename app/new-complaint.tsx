import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { XIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { ThemeColors } from '@/types/ui'

export default function CreateComplaintModal() {
  const router = useRouter()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const handleClose = () => {
    router.back()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <Text size="lg" weight="semibold" variant="primary">
          Nova Reclamação
        </Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <XIcon color={colors.textPrimary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}></ScrollView>
    </KeyboardAvoidingView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    closeButton: {
      padding: 4
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24
    },
    scrollView: {
      flex: 1
    }
  })
