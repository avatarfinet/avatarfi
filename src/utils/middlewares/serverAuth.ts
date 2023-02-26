import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'universal-cookie'

export default async function serverAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  role?: 'user' | 'admin' | 'super'
) {
  const cookies = new Cookies(req.headers.cookie)
  const token = await cookies.get('avatarfi_access_token')
  try {
    // VERIFY COOKIE
    const data = jwt.verify(token, process.env.SESSION_SECRET as string) as {
      id?: string
      role?: string
    }
    // CHECK ROLE IF GIVEN
    if (!!role && data.role !== role) throw Error
    // MATCH ID
    if (data.id !== req.query.id) throw Error
    // SUCCESS
    return { ...data, isError: false }
  } catch {
    // FAIL
    res.status(403).send('Auth Failed!')
    return { isError: true }
  }
}
