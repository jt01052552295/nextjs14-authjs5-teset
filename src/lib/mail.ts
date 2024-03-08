import sendEmail from './send-email'

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await sendEmail(email, 'Confirm your email', `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`)
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await sendEmail(email, 'Reset your password', `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`)
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail(email, '2FA Code', `<p>Your 2FA code: ${token}</p>`)
}
