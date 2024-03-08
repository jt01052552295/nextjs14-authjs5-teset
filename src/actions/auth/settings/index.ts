'use server'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { SettingsSchema } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'

import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

const handler = async (values: InputType): Promise<ReturnType> => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const dbUser = await getUserById(user.id as string)

  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { data: 'Verification email sent!' }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
    if (!passwordsMatch) {
      return { error: 'Incorrect password!' }
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    values.newPassword = undefined
  }

  try {
    // throw Error("test");
    const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        ...values,
      },
    })

    return { data: 'Success to update.' }
  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to update.',
    }
  }
}

export const settingsSchema = createSafeAction(SettingsSchema, handler)
