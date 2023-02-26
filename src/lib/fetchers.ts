import axios, { AxiosPromise } from 'axios'

const transport = axios.create({
  withCredentials: true,
})

export function postSignup(userData: {
  email: string
  name?: string
  surname?: string
  phone?: string
  password: string
}) {
  return axios.post(`/api/users/signup`, userData)
}

export function postLogin(userData: {
  email: string
  password: string
}): AxiosPromise<{
  token: string
  id: string
  role: string
  email: string
  name?: string
  surname?: string
  phone?: string
}> {
  return axios.post(`/api/users/login`, userData)
}

export function postResetPwd({
  email,
  origin,
  userAgent,
}: {
  email: string
  origin: string
  userAgent: string
}) {
  return axios.post('/api/users/reset-pwd', { email, origin, userAgent })
}

export function postNewPwd({
  pwdResetToken,
  password,
}: {
  pwdResetToken: any
  password: string
}) {
  return axios.post('/api/users/new-pwd', { pwdResetToken, password })
}

export function putUserField({
  actionType,
  id,
  field,
  value,
}: {
  actionType: string
  id: string
  field: string
  value: string
}) {
  return transport.put(`/api/users?id=${id}&action=${actionType}`, {
    [field]: value,
  })
}

export function getUserFields({
  id,
  fields,
}: {
  id: string
  fields: string[]
}) {
  return axios.get(`/api/users?id=${id}&fields=${fields.join('%20')}`)
}
