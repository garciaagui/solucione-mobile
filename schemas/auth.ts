import { z } from 'zod'

import { isValidPassword } from '@/functions/password'

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
    password: z.string().min(1, 'Insira sua senha').refine(isValidPassword, {
      message: 'A senha não está de acordo com os requisitos'
    }),
    confirmPassword: z.string({ required_error: 'Insira a senha' })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem'
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
