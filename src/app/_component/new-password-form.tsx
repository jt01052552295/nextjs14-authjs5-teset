'use client'

import { ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FormError } from '@/app/_component/message/form-error'
import { FormSuccess } from '@/app/_component/message/form-success'
import Link from 'next/link'
import { useAction } from '@/hooks/use-action'
import { actionAuthNewPassword } from '@/actions/auth/new-password'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') as string
  const [password, setPassword] = useState('1111')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const { execute, fieldErrors } = useAction(actionAuthNewPassword, {
    onSuccess: (data) => {
      //   console.log(data)
      setSuccess(data)
      //   router.push(`/profile`)
    },
    onError: (error) => {
      console.error(error)
      setError(error)
    },
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    startTransition(() => {
      execute({ password, token })
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input id="password" value={password} onChange={onChangePassword} type="password" placeholder="" />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <button type="submit" disabled={!password || isPending}>
          {isPending ? 'loading...' : 'Reset password'}
        </button>

        <br />
        <Link href="/auth/login">로그인하러가기</Link>
      </form>
    </div>
  )
}
