import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/utils'
import { User } from '@/models'
import bcrypt from 'bcryptjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  if (method !== 'POST') return res.status(405).send('req_method_not_supported')
  const { name, surname, email, phone, password } = body
  await connectDB()

  function createUser() {
    const newUser = new User({
      name,
      surname,
      email,
      phone,
      password,
    })
    // Hash password before saving in database
    try {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err
          newUser.password = hash
          await newUser
            .save()
            .then((user) => res.json(user))
            .catch(() => res.status(500).send('Could not create the user!'))
        })
      })
    } catch {
      return res.status(500).send('Could not create password salt!')
    }
  }

  User.findOne({ email }, 'email')
    .then((user) => {
      if (!!user) return res.status(403).json({ emailIsRegistered: true })
      createUser()
    })
    .catch(() => res.status(500).send('Something went wrong.'))
}

export default handler
