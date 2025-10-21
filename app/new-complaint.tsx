import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { FirstFormStep } from '@/components/app/_screens/new-complaint'
import { XIcon } from '@/components/icons'
import { Text } from '@/components/ui'
import { StepProvider, useStep } from '@/contexts/step-context'
import { useTheme } from '@/contexts/theme-context'
import { NewComplaintFormValues, newComplaintSchema } from '@/schemas/complaint'
import { ThemeColors } from '@/types/ui'

function ModalContent() {
  const router = useRouter()
  const { currentStep } = useStep()

  const form = useForm<NewComplaintFormValues>({
    resolver: zodResolver(newComplaintSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      firstStep: {
        title: '',
        description: ''
      },
      secondStep: {
        neighborhood: '',
        reference: '',
        street: '',
        zipCode: ''
      },
      thirdStep: {
        image: undefined
      }
    }
  })

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const handleClose = () => {
    router.back()
  }

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <FirstFormStep form={form} />
      default:
        return null
    }
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
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Text size="sm" variant="secondary" style={styles.stepIndicator}>
          Passo {currentStep} de 3
        </Text>
        {renderFormStep()}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default function NewComplaintModal() {
  return (
    <StepProvider initialStep={1} stepsNumber={3}>
      <ModalContent />
    </StepProvider>
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
      flex: 1,
      paddingBottom: 48
    },
    scrollViewContent: {
      flexGrow: 1
    },
    stepIndicator: {
      marginBottom: 16
    }
  })
