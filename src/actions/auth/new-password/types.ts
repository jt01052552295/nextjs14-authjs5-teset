import { z } from 'zod'
import { User } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { ActionAuthNewPassword } from './schema'

export type InputType = z.infer<typeof ActionAuthNewPassword>
export type ReturnType = ActionState<InputType, string>
