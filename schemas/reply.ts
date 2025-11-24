import { z } from 'zod'

export const newReplySchema = z.object({
  description: z
    .string({
      required_error: 'A descrição é obrigatória'
    })
    .min(40, {
      message: 'A descrição precisa ter no mínimo 40 caracteres'
    })
    .max(255, {
      message: 'A descrição pode ter no máximo 255 caracteres'
    }),
  image: z.string().optional()
})

export type NewReplyFormValues = z.infer<typeof newReplySchema>
