import { z } from 'zod'

export const ActionAuthLogin = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(3, {
    message: 'Minimum 3 characters required',
  }),
})
