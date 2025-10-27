import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'

import { PasswordValidator } from '@/components/app/_screens/sign-up'
import { Button, Input, Text } from '@/components/ui'
import { useTheme } from '@/contexts/theme-context'
import { handleMutationError } from '@/functions/error'
import { showSuccessToast } from '@/functions/toast'
import { RegisterFormValues, registerSchema } from '@/schemas/auth'
import { register } from '@/services/auth'
import { ThemeColors } from '@/types/ui'

export default function SignUpScreen() {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const router = useRouter()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      await register(data)
    },
    onSuccess: async () => {
      router.replace('/sign-in')
      showSuccessToast(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login.'
      )
    },
    onError: error => {
      handleMutationError(error, 'Erro inesperado ao fazer cadastro')
    }
  })

  const onSubmit = (data: RegisterFormValues) => {
    mutate(data)
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.header}>
        <Text
          size="xl"
          weight="semibold"
          variant="primary"
          style={styles.textAlign}>
          Cadastro
        </Text>
        <Text size="sm" variant="secondary" style={styles.textAlign}>
          Preencha os campos abaixo e faça seu cadastro na Solucione
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              variant="text"
              label="Nome completo"
              errorMessage={errors.name?.message}
              autoCapitalize="none"
              placeholder="Ex.: Ana Silva"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              variant="text"
              label="E-mail"
              errorMessage={errors.email?.message}
              autoCapitalize="none"
              placeholder="Ex.: ana@exemplo.com"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                variant="password"
                label="Senha"
                errorMessage={errors.password?.message}
                placeholder="**********"
                value={value}
                onChangeText={onChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <PasswordValidator
                password={value}
                isFocused={isPasswordFocused}
                hasError={!!errors.password?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              variant="password"
              label="Confirme sua senha"
              errorMessage={errors.confirmPassword?.message}
              placeholder="**********"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Button
          disabled={isPending}
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Concluir
        </Button>
      </View>
    </ScrollView>
  )
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      marginTop: 16
    },
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 64
    },
    form: {
      flex: 1,
      gap: 16
    },
    header: {
      alignItems: 'center',
      marginBottom: 24
    },
    textAlign: {
      textAlign: 'center'
    }
  })
