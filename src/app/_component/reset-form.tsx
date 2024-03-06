'use client'

import { ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormError } from '@/app/_component/message/form-error'
import { FormSuccess } from '@/app/_component/message/form-success'

import { useAction } from '@/hooks/use-action'
import { actionAuthReset } from '@/actions/auth/reset'

export const ResetForm = () => {
  const [email, setEmail] = useState('checkmate99@naver.com')
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const { execute, fieldErrors } = useAction(actionAuthReset, {
    onSuccess: (data) => {
      //   console.log(data)
      setSuccess('발송완료')
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
      execute({ email })
    })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="email">아이디</label>
            <input id="email" value={email} onChange={onChangeEmail} type="text" placeholder="" />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
        </div>

        <button type="submit" disabled={!email || isPending}>
          {isPending ? 'loading...' : 'Send reset email'}
        </button>

        <br />
        <Link href="/auth/login">로그인하러가기</Link>
      </form>
    </div>
  )
}
