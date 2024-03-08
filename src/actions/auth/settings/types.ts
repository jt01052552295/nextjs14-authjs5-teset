import { z } from 'zod'
import { User } from '@prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { SettingsSchema } from './schema'

export type InputType = z.infer<typeof SettingsSchema>
export type ReturnType = ActionState<InputType, User | any>
