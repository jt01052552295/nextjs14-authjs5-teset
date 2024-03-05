import sendEmail from './send-email'

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await sendEmail(email, 'Confirm your email', `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`)
}
