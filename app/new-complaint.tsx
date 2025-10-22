import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native'

import { NewComplaintHeader } from '@/components/app/_screens/new-complaint'
import { Button, Input, Textarea } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { formatZipCode } from '@/functions/complaints'
import { NewComplaintFormValues, newComplaintSchema } from '@/schemas/complaint'
import { ThemeColors } from '@/types/ui'

export default function NewComplaintModal() {
  const router = useRouter()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const form = useForm<NewComplaintFormValues>({
    resolver: zodResolver(newComplaintSchema),
    defaultValues: {
      title: '',
      description: '',
      neighborhood: '',
      reference: '',
      street: '',
      zipCode: '',
      image: undefined
    }
  })

  const { control, formState, handleSubmit } = form
  const errors = formState.errors

  const handleClose = () => {
    router.back()
  }

  const onSubmit = (data: NewComplaintFormValues) => {
    console.log(data)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <NewComplaintHeader handleClose={handleClose} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Título"
              variant="text"
              errorMessage={errors.title?.message}
              autoCapitalize="none"
              placeholder="Ex: Falta de coleta de lixo"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Textarea
              label="Descrição"
              errorMessage={errors.description?.message}
              placeholder="Descreva detalhadamente o problema ocorrido, mencionando horários, frequência e impacto."
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
          name="street"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Rua"
              variant="text"
              errorMessage={errors.street?.message}
              autoCapitalize="none"
              placeholder="Ex: Rua das Flores, n. 123"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="neighborhood"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Bairro"
              variant="text"
              errorMessage={errors.neighborhood?.message}
              autoCapitalize="none"
              placeholder="Ex: Centro"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="zipCode"
          render={({ field: { onChange, value } }) => (
            <Input
              label="CEP"
              variant="text"
              errorMessage={errors.zipCode?.message}
              autoCapitalize="none"
              placeholder="Ex: 12.345-000"
              maxLength={10}
              value={value}
              onChangeText={e => {
                const formatted = formatZipCode(e)
                onChange(formatted)
              }}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
          Enviar
        </Button>
      </ScrollView>
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
      flex: 1,
      paddingBottom: 48
    },
    scrollViewContent: {
      flexGrow: 1,
      gap: 12
    },
    button: {
      marginTop: 12
    }
  })
