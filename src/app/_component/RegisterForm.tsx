'use client'
import { ChangeEventHandler, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useAction } from '@/hooks/use-action'
import { actionAuthSignUp } from '@/actions/auth/signup'
import { FormErrors } from './Form-errors'

const RegisterForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState('checkmate99@naver.com')
  const [name, setName] = useState('test')
  const [password, setPassword] = useState('1111')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const onChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  const { execute, fieldErrors } = useAction(actionAuthSignUp, {
    onSuccess: (data) => {
      console.log(data)
      alert('이메일확인필')
      // router.push(`/auth/login`)
    },
    onError: (error) => {
      console.error(error)
      alert(error)
    },
  })

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    startTransition(() => {
      execute({ name, email, password })
    })
  }

  return (
    <div>
      <form action={onSubmit}>
        <div>
          <div>
            <label htmlFor="name">이름</label>
            <input id="name" name="name" type="text" placeholder="" value={name} onChange={onChangeName} />
          </div>
          <div>
            <FormErrors id="name" errors={fieldErrors} />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="text" placeholder="" value={email} onChange={onChangeEmail} />
          </div>
          <div>
            <FormErrors id="email" errors={fieldErrors} />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="" value={password} onChange={onChangePassword} />
          </div>
          <div>
            <FormErrors id="password" errors={fieldErrors} />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            {isPending ? 'loading...' : '가입'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
