import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

import { db } from '@/lib/db'
import { getVerificationTokenByEmail } from '@/data/verificiation-token'

// dayjs.locale('ko')
// dayjs.extend(relativeTime)

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()

  const expires = dayjs(new Date().getTime()).add(9, 'hour').add(5, 'minute').format()

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verficationToken
}
