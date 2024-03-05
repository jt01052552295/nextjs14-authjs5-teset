import { z } from 'zod'

export const ActionAuthSignUp = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(3, {
    message: 'Minimum 3 characters required',
  }),
})
