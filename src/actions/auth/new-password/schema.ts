import { z } from 'zod'

export const ActionAuthNewPassword = z.object({
  password: z.string().min(3, {
    message: 'Minimum of 3 characters required',
  }),
  token: z.string().min(1, {
    message: 'token is required',
  }),
})
