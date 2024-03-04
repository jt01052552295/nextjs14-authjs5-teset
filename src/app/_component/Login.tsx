'use client'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react' // 클라이언트
// import { signIn } from '@/auth' // 서버액션

export default function LoginModal() {
  const [id, setId] = useState('test')
  const [password, setPassword] = useState('1111')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      // auth.ts 에 등록한 signIn이 여기서 쓴다.
      await signIn('credentials', {
        username: id,
        password,
        redirect: false, // 서버쪽에서 리다이렉트 함.
      })
      router.replace('/profile') // 일단 클라이언트에서 리다이렉트
    } catch (err) {
      console.error(err)
      setMessage('아이디와 비밀번호가 일치하지 않습니다.')
    }
  }

  const onClickClose = () => {
    router.back()
  }

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="id">아이디</label>
            <input id="id" value={id} onChange={onChangeId} type="text" placeholder="" />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input id="password" value={password} onChange={onChangePassword} type="password" placeholder="" />
          </div>
        </div>
        <div>{message}</div>

        <button disabled={!id && !password}>로그인하기</button>
      </form>
    </div>
  )
}
