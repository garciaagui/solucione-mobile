import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'

import { EmailIcon, LockIcon } from '@/components/icons'
import { Button, Input, Text } from '@/components/ui'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/contexts/theme-context'
import { LoginFormValues, loginSchema } from '@/schemas/auth'
import { ThemeColors } from '@/types/ui'

export default function SignInScreen() {
  const { login, isLoggingIn } = useAuth()

  const { colors } = useTheme()
  const styles = useMemo(() => createStyles(colors), [colors])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  const onSubmit = (credentials: LoginFormValues) => {
    login(credentials)
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.header}>
        <Text size="xl" weight="semibold" variant="primary">
          Bem-vindo(a) à Solucione
        </Text>
        <Text size="sm" variant="secondary">
          Insira suas credenciais para realizar o login
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              variant="text"
              icon={EmailIcon}
              errorMessage={errors.email?.message}
              autoCapitalize="none"
              placeholder="E-mail"
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
            <Input
              variant="password"
              icon={LockIcon}
              errorMessage={errors.password?.message}
              placeholder="Senha"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Button
          disabled={isLoggingIn}
          loading={isLoggingIn}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Entrar
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
      paddingTop: 96
    },
    form: {
      flex: 1,
      gap: 16
    },
    header: {
      alignItems: 'center',
      marginBottom: 24
    }
  })
