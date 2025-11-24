import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'
import Toast from 'react-native-toast-message'

import ModalHeader from '@/components/app/modal-header'
import { CUSTOM_TOAST_CONFIG } from '@/components/custom-toast'
import { Button, ImagePicker, Textarea } from '@/components/ui'
import { COMPLAINTS_QUERY_KEY } from '@/constants/query-keys'
import { useTheme } from '@/contexts/theme-context'
import { handleMutationError } from '@/functions/error'
import { generateFormData } from '@/functions/reply'
import { showSuccessToast } from '@/functions/toast'
import { NewReplyFormValues, newReplySchema } from '@/schemas/reply'
import { createReply } from '@/services/reply'
import { ThemeColors } from '@/types/ui'

export default function UpdateComplaintStatusModal() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { colors } = useTheme()
  const { id } = useLocalSearchParams()
  const styles = useMemo(() => createStyles(colors), [colors])

  const form = useForm<NewReplyFormValues>({
    resolver: zodResolver(newReplySchema),
    defaultValues: {
      description: '',
      image: undefined
    }
  })

  const { control, formState, handleSubmit, reset } = form
  const errors = formState.errors

  const handleClose = () => {
    reset()
    router.back()
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewReplyFormValues) => {
      const formData = generateFormData(data)
      await createReply(formData)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [COMPLAINTS_QUERY_KEY, id]
      })
      handleClose()
      showSuccessToast(
        'Sucesso!',
        'Status da reclamação atualizado com sucesso'
      )
    },
    onError: error => {
      handleMutationError(
        error,
        'Erro inesperado ao atualizar status da reclamação'
      )
    }
  })

  const onSubmit = (data: NewReplyFormValues) => {
    mutate(data)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ModalHeader
        title="Atualizar status da reclamação"
        subtitle="Preencha os campos abaixo para atualizar o status da reclamação."
        handleClose={handleClose}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              label="Descrição"
              errorMessage={errors.description?.message}
              placeholder="Descreva detalhadamente a solução para o problema relatado."
              maxLength={255}
              minHeight={120}
              showCharCount={true}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <ImagePicker
              label="Imagem"
              description="Adicione uma foto que ilustre a solução para o problema relatado"
              errorMessage={errors.image?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Button
          disabled={isPending}
          loading={isPending}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          {isPending ? 'Enviando...' : 'Enviar'}
        </Button>
      </ScrollView>

      <Toast
        autoHide={true}
        position="top"
        topOffset={10}
        visibilityTime={3000}
        config={CUSTOM_TOAST_CONFIG}
      />
    </KeyboardAvoidingView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24
    },
    scrollView: {
      flex: 1
    },
    scrollViewContent: {
      flexGrow: 1,
      gap: 12,
      paddingBottom: 48
    },
    button: {
      marginTop: 12
    }
  })
