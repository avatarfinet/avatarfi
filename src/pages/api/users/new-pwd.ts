import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/utils'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  if (method !== 'POST') return res.status(405).send('req_method_not_supported')
  const { pwdResetToken, password } = body
  await connectDB()

  User.findOne({ pwdResetToken, pwdResetExpiration: { $gt: Date.now() } })
    .then((user) => {
      console.log(user)
      if (!user)
        return res
          .status(422)
          .send('Session expired! Try Again with a new Request')

      bcrypt
        .hash(password, 12)
        .then((hash) => {
          user.password = hash
          user.pwdResetToken = undefined
          user.pwdResetExpiration = undefined
          user.save().then(() => {
            res.status(200).send('Password Updated successfully')
          })
        })
        .catch(() => Error)
    })
    .catch(() => res.status(500).send('Something went wrong.'))
}

export default handler
