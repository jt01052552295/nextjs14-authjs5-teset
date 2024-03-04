'use server'
import { auth } from '@/auth'
import { InputType, ReturnType } from './types'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { ActionAuthSignUp } from './schema'
import { createSafeAction } from '@/lib/create-safe-action'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, password } = data
  let user
  try {
    // throw Error("test");
    user = await db.user.create({
      data: {
        id,
        password,
      },
    })
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
