'use server'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { ActionAuthSignUp } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, email, password } = data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  let user
  try {
    // throw Error("test");
    user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
  } catch (error) {
    console.error(error)
    return {
      error: 'Failed to create.',
    }
  }

  revalidatePath(`/login`)
  // 해당 /URL에 있던 캐시를 삭제하고 다시 생성해주는 함수인데 페이지를 다시 로드해주는 기능도 있음,
  // 새로고침이 아니라 차이점만 바꿔주는 새로고침

  return { data: user }
}

export const actionAuthSignUp = createSafeAction(ActionAuthSignUp, handler)
