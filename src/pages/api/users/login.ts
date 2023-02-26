import { User } from '@/lib/models'
import { connectDB } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  if (method !== 'POST') return res.status(405).send('req_method_not_supported')
  const { email, password } = body
  await connectDB()

  User.findOne({ email }, 'id role email name surname password phone')
    .then((doc) => {
      if (!doc) return res.status(404).json({ emailIsRegistered: false })
      const { id, role, name, surname, email, phone } = doc
      // Check password
      bcrypt
        .compare(password, doc.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(403).json({ passwordIsMatch: false })
          const expiresIn = 60 * 60 * 24 * 7 // 1 week in seconds
          // Create JWT Payload
          const payload = {
            id,
            role,
          }
          // Sign token
          jwt.sign(
            payload,
            process.env.SESSION_SECRET as string,
            {
              expiresIn,
            },
            (err, token) => {
              if (err)
                return res.status(500).send('Could not create Access Token!')
              return res.status(200).json({
                token,
                id,
                role,
                email,
                name,
                surname,
                phone,
              })
            }
          )
        })
        .catch(() => res.status(500).send('Bcrypt failed!'))
    })
    .catch(() => res.status(500).send('Failed to perform user check!'))
}

export default handler
