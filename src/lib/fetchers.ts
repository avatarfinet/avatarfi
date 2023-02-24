import axios, { AxiosPromise } from 'axios'

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
  return axios.put(`/api/users?id=${id}&action=${actionType}`, {
    [field]: value,
  })
}

export function patchUserField({
  actionType,
  id,
  field,
  value,
}: {
  actionType: string
  id: string
  field: string
  value: any
}) {
  return axios.patch(`/api/users?id=${id}&action=${actionType}`, {
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

export function getGeckoMarketSearch(queryParams: string[]) {
  const assets = queryParams.join('%2C')
  return axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assets}&order=market_cap_desc`
  )
}
