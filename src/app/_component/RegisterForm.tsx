'use client'

import { useRouter } from 'next/navigation'
import { useAction } from '@/hooks/use-action'
import { actionAuthSignUp } from '@/actions/auth/signup'
import { FormErrors } from './Form-errors'

const RegisterForm = () => {
  const router = useRouter()

  const { execute, fieldErrors } = useAction(actionAuthSignUp, {
    onSuccess: (data) => {
      alert('가입완료')
      router.push(`/login`)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const id = formData.get('id') as string
    const password = formData.get('password') as string

    execute({ id, password })
  }

  return (
    <div>
      <form action={onSubmit}>
        <div>
          <div>
            <label htmlFor="id">아이디</label>
            <input id="id" name="id" type="text" placeholder="" />
          </div>
          <div>
            <FormErrors id="id" errors={fieldErrors} />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="" />
          </div>
          <div>
            <FormErrors id="password" errors={fieldErrors} />
          </div>
        </div>
        <div>
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
