'use client'

import onSubmit from '../_lib/signup'
import { useFormState, useFormStatus } from 'react-dom'

function showMessage(messasge: string) {
  if (messasge === 'no_id') {
    return '아이디를 입력하세요.'
  }
  if (messasge === 'no_name') {
    return '닉네임을 입력하세요.'
  }
  if (messasge === 'no_password') {
    return '비밀번호를 입력하세요.'
  }
  if (messasge === 'no_image') {
    return '이미지를 업로드하세요.'
  }
  if (messasge === 'user_exists') {
    return '이미 사용 중인 아이디입니다.'
  }
  return '-'
}

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null })
  const { pending } = useFormStatus()

  return (
    <>
      <div>
        <form action={formAction}>
          <div>
            <div>
              <label htmlFor="id">아이디</label>
              <input id="id" name="id" type="text" placeholder="" required />
            </div>

            <div>
              <label htmlFor="password">비밀번호</label>
              <input id="password" name="password" type="password" placeholder="" required />
            </div>
          </div>
          <div>
            <button disabled={pending}>가입하기</button>
            <div>{showMessage(state?.message ?? '')}</div>
          </div>
        </form>
      </div>
    </>
  )
}
