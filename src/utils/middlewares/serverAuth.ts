import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'universal-cookie'

export default async function serverAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req.headers.cookie)
  const token = await cookies.get('avatarfi_access_token')
  try {
    const data = jwt.verify(token, process.env.SESSION_SECRET as string) as {
      id?: string
      role?: string
    }

    if (data.id !== req.query.id) throw Error
    return { ...data, isError: false }
  } catch {
    res.status(403).send('Auth Failed!')
    return { isError: true }
  }
}
