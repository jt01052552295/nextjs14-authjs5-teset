'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { oauthSignIn } from '@/actions/auth/oauth'

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') as string

  //   const onOauth = async (provider: string) => {
  //     await signIn(provider, {
  //       callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  //     })
  //   }

  const onOauth = (provider: string) => {
    oauthSignIn(provider, callbackUrl || DEFAULT_LOGIN_REDIRECT)
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <button type="button" className="w-full" onClick={() => onOauth('google')}>
        Google
      </button>
      <button type="button" className="w-full" onClick={() => onOauth('github')}>
        Github
      </button>
    </div>
  )
}
