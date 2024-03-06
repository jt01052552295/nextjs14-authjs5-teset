'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/auth/new-verification'
import { useRouter } from 'next/navigation'
import { FormError } from '@/app/_component/message/form-error'
import { FormSuccess } from '@/app/_component/message/form-success'

export const NewVerificationForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    // if (success || error) return

    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then((data) => {
        console.log(data)
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div>
      {!success && !error && 'wait..'}
      {success && !error && <FormSuccess message={success} />}
      {!success && error && <FormError message={error} />}
    </div>
  )
}
