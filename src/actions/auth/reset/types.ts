import { z } from 'zod'
import { User } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { ActionAuthReset } from './schema'

export type InputType = z.infer<typeof ActionAuthReset>
export type ReturnType = ActionState<InputType, User>
