import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    // console.log('Email sent:', info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export default sendEmail
