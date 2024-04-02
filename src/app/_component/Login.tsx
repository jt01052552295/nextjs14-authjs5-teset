'use client'

import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FormErrors } from './Form-errors'
import { FormError } from './message/form-error'
import { useAction } from '@/hooks/use-action'
import { actionAuthLogin } from '@/actions/auth/login'
import { Social } from './social'

export default function LoginModal() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider!' : ''

  const [email, setEmail] = useState('checkmate99@naver.com')
  const [password, setPassword] = useState('2222')
  const [code, setCode] = useState('')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const { execute, fieldErrors } = useAction(actionAuthLogin, {
    onSuccess: (data) => {
      console.log(data)

      if (data?.twoFactor) {
        setShowTwoFactor(true)
      } else {
        router.push(`/settings`)
      }
    },
    onError: (error) => {
      console.error(error)
      alert(error)
    },
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    startTransition(() => {
      execute({ email, password, code })
    })
  }

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const onChangeCode: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {!showTwoFactor && (
            <>
              <div>
                <label htmlFor="email">아이디</label>
                <input id="email" value={email} onChange={onChangeEmail} type="text" placeholder="" />
              </div>
              <div>
                <FormErrors id="email" errors={fieldErrors} />
              </div>

              <div>
                <label htmlFor="password">비밀번호</label>
                <input id="password" value={password} onChange={onChangePassword} type="password" placeholder="" />
              </div>
              <div>
                <FormErrors id="password" errors={fieldErrors} />
              </div>
            </>
          )}

          {showTwoFactor && (
            <div>
              <label htmlFor="code">인증코드</label>
              <input id="code" value={code} onChange={onChangeCode} type="text" placeholder="" />
            </div>
          )}
        </div>

        <Link href="/auth/reset">Forgot password</Link>
        <br />

        <button type="submit" disabled={(!email && !password) || isPending}>
          {isPending ? 'loading...' : showTwoFactor ? 'Confirm' : 'Login'}
        </button>
        <FormError message={urlError} />
        <br />
        <Link href="/auth/register">가입페이지</Link>
      </form>
      <div>
        <Social />
      </div>
    </div>
  )
}
