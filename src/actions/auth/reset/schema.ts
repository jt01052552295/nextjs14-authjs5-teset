import { z } from 'zod'

export const ActionAuthReset = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})
