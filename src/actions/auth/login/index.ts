'use server'
import { signIn } from '@/auth'
import bcrypt from 'bcryptjs'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { ActionAuthLogin } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password } = data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { error: 'Confirmation email sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to login..',
    }
  }

  revalidatePath(`/profile`)
  // 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데 페이지를 다시 로드해주는 기능도 있음,
  // 새로고침이 아니라 차이점만 바꿔주는 새로고침

  return { data: existingUser }
}

export const actionAuthLogin = createSafeAction(ActionAuthLogin, handler)
