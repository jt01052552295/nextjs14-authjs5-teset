'use client'

import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FormErrors } from './Form-errors'
import { useAction } from '@/hooks/use-action'
import { actionAuthLogin } from '@/actions/auth/login'
import { Social } from './social'

export default function LoginModal() {
  const [email, setEmail] = useState('checkmate99@naver.com')
  const [password, setPassword] = useState('1111')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { execute, fieldErrors } = useAction(actionAuthLogin, {
    onSuccess: (data) => {
      console.log(data)
      router.push(`/settings`)
    },
    onError: (error) => {
      console.error(error)
      alert(error)
    },
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    startTransition(() => {
      execute({ email, password })
    })
  }

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
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
        </div>

        <Link href="/auth/reset">Forgot password</Link>
        <br />

        <button type="submit" disabled={(!email && !password) || isPending}>
          {isPending ? 'loading...' : '로그인'}
        </button>

        <br />
        <Link href="/auth/register">가입페이지</Link>
      </form>
      <div>
        <Social />
      </div>
    </div>
  )
}
