import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Insira seu e-mail'
    })
    .email({
      message: 'Insira um e-mail válido'
    })
    .toLowerCase(),
  password: z.string().min(1, 'Insira sua senha')
})

export const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: 'O nome deve ter no mínimo 3 caracteres'
    }),
    email: z
      .string()
      .min(1, {
        message: 'Insira seu e-mail'
      })
      .email({
        message: 'Insira um e-mail válido'
      })
      .toLowerCase(),
    password: z
      .string()
      .min(10, {
        message: 'A senha deve ter no mínimo 10 caracteres'
      })
      .refine(
        value =>
          /[A-Z]/.test(value) && // Letra maiúscula
          /[a-z]/.test(value) && // Letra minúscula
          /[0-9]/.test(value) && // Número
          /[^A-Za-z0-9]/.test(value), // Caractere especial
        {
          message: 'A senha inserida não atende aos requisitos'
        }
      ),
    confirmPassword: z.string({ required_error: 'Insira a senha' })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem'
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
