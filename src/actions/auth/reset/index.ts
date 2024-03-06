'use server'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { ActionAuthReset } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email } = data

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to reset email sent.',
    }
  }

  //   revalidatePath(`/login`)
  // 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데 페이지를 다시 로드해주는 기능도 있음,
  // 새로고침이 아니라 차이점만 바꿔주는 새로고침

  return { data: existingUser }
}

export const actionAuthReset = createSafeAction(ActionAuthReset, handler)
