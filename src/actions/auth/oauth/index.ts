'use server'

import { signIn } from '@/auth'
import { revalidatePath } from 'next/cache'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from '@auth/core/errors'

export const oauthSignIn = async (provider: string, callbackUrl: string) => {
  await signIn(provider, {
    callbackUrl: callbackUrl,
  })
}
