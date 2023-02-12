import * as z from 'zod'

export const schema = z.object({
  name: z.string().min(1, { message: 'Obrigatório' }),
  amount: z
    .string()
    .min(1, { message: 'Obrigatório' })
    .refine(
      (value) => {
        const price = Number(value) ?? 0
        return price > 0
      },
      { message: 'Somente número positivo' }
    ),
  type: z.enum(['withdrawn', 'deposit']),
  category: z.string().min(1, { message: 'Obrigatório' })
})
