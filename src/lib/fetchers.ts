import clientAuth from '@/utils/middlewares/clientAuth'
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
  console.log(clientAuth().get('avatarfi_access_token'))
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

export function postResetPwd(email: string) {
  return axios.post('/api/users/reset-pwd', email)
}
