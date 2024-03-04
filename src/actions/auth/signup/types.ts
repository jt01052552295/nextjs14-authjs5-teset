import { z } from 'zod'
import { User } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { ActionAuthSignUp } from './schema'

export type InputType = z.infer<typeof ActionAuthSignUp>
export type ReturnType = ActionState<InputType, User>
