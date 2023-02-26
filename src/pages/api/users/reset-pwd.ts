import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, resetPwdHtml } from '@/utils'
import { User } from '@/lib/models'
import crypto from 'crypto'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  if (method !== 'POST') return res.status(405).send('req_method_not_supported')
  const { email, origin, userAgent } = body
  await connectDB()

  User.findOne({ email }, 'email')
    .then((user) => {
      if (!user) return res.status(403).json({ emailIsRegistered: false })
      // HANDLE EMAIL PREP & SEND
      return crypto.randomBytes(32, (err, buffer) => {
        if (err) throw Error
        const token = buffer.toString('hex')
        user.pwdResetToken = token
        user.pwdResetExpiration = Date.now() + 1000 * 60 * 60 // 1 hour in ms
        user
          .save()
          .then(async () => {
            const actionUrl = `${origin}/new-pwd?pwdResetToken=${token}`
            const msg = {
              from: 'no-reply@avatarfi.net',
              to: user.email,
              subject: 'Avatarfi <> Forgot Password!',
              html: resetPwdHtml({
                originUrl: origin,
                productName: 'Avatarfi',
                userAgent,
                actionUrl,
                expireTime: '1 hour',
                supportMail: 'info@avatarfi.net',
              }),
            }
            await sgMail.send(msg).catch(() => Error)
            res.send('Please check your E-mail inbox / spam!')
          })
          .catch(() => Error)
      })
    })
    .catch(() => res.status(500).send('Something went wrong.'))
}

export default handler
