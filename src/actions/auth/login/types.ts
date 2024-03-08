import { z } from 'zod'
import { User } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { ActionAuthLogin } from './schema'

export type InputType = z.infer<typeof ActionAuthLogin>
export type ReturnType = ActionState<InputType, User | any>
