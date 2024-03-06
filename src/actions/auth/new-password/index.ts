'use server'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { ActionAuthNewPassword } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'

import { getUserByEmail } from '@/data/user'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { password, token } = data

  if (!token) {
    return { error: 'Missing token!' }
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to reset email sent.',
    }
  }

  //   revalidatePath(`/login`)
  // 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데 페이지를 다시 로드해주는 기능도 있음,
  // 새로고침이 아니라 차이점만 바꿔주는 새로고침

  return { data: 'Password updated!' }
}

export const actionAuthNewPassword = createSafeAction(ActionAuthNewPassword, handler)
