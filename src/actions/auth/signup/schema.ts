import { z } from 'zod'

export const ActionAuthSignUp = z.object({
  id: z
    .string({
      required_error: 'Account is required',
      invalid_type_error: 'Account is required',
    })
    .min(3, {
      message: 'Account is too short.',
    }),
  password: z.string().min(3, {
    message: 'Minimum 3 characters required',
  }),
})
