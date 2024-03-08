'use client'

import { ChangeEventHandler, useEffect, useState, useTransition } from 'react'
import { auth, signOut } from '@/auth'
import { FormError } from '@/app/_component/message/form-error'
import { FormSuccess } from '@/app/_component/message/form-success'
import { useCurrentUser } from '@/hooks/use-current-user'
import { UserRole } from '@prisma/client'
import { useAction } from '@/hooks/use-action'
import { settingsSchema } from '@/actions/auth/settings'

const SettingsPage = () => {
  const user = useCurrentUser()

  const [email, setEmail] = useState<string | undefined>('')
  const [name, setName] = useState<string | undefined>('')
  const [password, setPassword] = useState<string | undefined>('')
  const [newPassword, setNewPassword] = useState<string | undefined>('')
  const [role, setRole] = useState<string | undefined>('')
  const [isOauth, setChecked] = useState<boolean | undefined>(false)

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
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

  const onChangeNewPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPassword(e.target.value)
  }

  const onChangeChecked: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked)
  }

  const { execute, fieldErrors } = useAction(settingsSchema, {
    onSuccess: (data) => {
      console.log(data)
      setSuccess(data)
      // router.push(`/auth/login`)
    },
    onError: (error) => {
      console.error(error)
      setError(error)
    },
  })

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const newPassword = formData.get('newPassword') as string
    const role = formData.get('role') as 'ADMIN' | 'USER'
    let isTwoFactorEnabled = false
    if (formData.get('isTwoFactorEnabled')) {
      isTwoFactorEnabled = true
    }

    setSuccess('')
    setError('')
    startTransition(() => {
      execute({ name, email, password, newPassword, role, isTwoFactorEnabled })
    })
  }

  useEffect(() => {
    console.log(user)
    if (user) {
      setEmail(user?.email as string)
      setName(user?.name as string)
      setRole(user?.role as string)
      setChecked(user?.isTwoFactorEnabled as boolean)
    }
  }, [user])

  return (
    <div className="w-[600px]">
      <div>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </div>
      <form className="space-y-6" action={onSubmit}>
        <div>
          <div className="space-y-4">
            <label htmlFor="name">이름</label>
            <input id="name" name="name" type="text" placeholder="" value={name} onChange={onChangeName} />
          </div>

          <div className="space-y-4">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="text" placeholder="" value={email} onChange={onChangeEmail} />
          </div>

          <div className="space-y-4">
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password" placeholder="" value={password} onChange={onChangePassword} />
          </div>

          <div className="space-y-4">
            <label htmlFor="newPassword"> 새비밀번호</label>
            <input id="newPassword" name="newPassword" type="password" placeholder="" value={newPassword} onChange={onChangeNewPassword} />
          </div>

          <div className="space-y-4">
            <label htmlFor="newPassword"> 권한</label>
            <select
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value)
              }}
            >
              <option value="">choice</option>
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.USER}>User</option>
            </select>
          </div>
          {user?.isOAuth === false && (
            <div className="space-y-4">
              <label htmlFor="isTwoFactorEnabled"> 인증</label>
              <input id="isTwoFactorEnabled" name="isTwoFactorEnabled" type="checkbox" checked={isOauth} onChange={onChangeChecked} />
            </div>
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="space-y-4">
          <button type="submit" disabled={isPending}>
            {isPending ? 'loading...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage
