import { z } from 'zod'

const email = z.string().email('Insira um e-mail válido')
const password = z.string().min(1, 'Insira sua senha')

export const loginSchema = z.object({
  email,
  password
})

export type LoginFormValues = z.infer<typeof loginSchema>
