import { setAuth } from '@/store'
import clientAuth from '@/utils/middlewares/clientAuth'
import isEmpty from 'is-empty'
import { postLogin } from '../fetchers'

export function handleLogin({
  email,
  password,
  setSubmitting,
  setFieldError,
  dispatch,
}: {
  email: string
  password: string
  setSubmitting: any
  setFieldError: any
  dispatch: Dispatch
}) {
  postLogin({ email, password })
    .then((res) => {
      const { token, id, role, email, name, surname, phone } = res.data
      if (!isEmpty(token)) {
        clientAuth().set({
          field: 'avatarfi_access_token',
          value: token,
          path: '/',
        })
        dispatch(setAuth({ id, role, email, name, surname, phone }))
      }
      setSubmitting(false)
    })
    .catch((err) => {
      const { emailIsRegistered, passwordIsMatch } = err?.response?.data
      if (!isEmpty(emailIsRegistered) && !emailIsRegistered)
        setFieldError('email', 'Email does not exist!')
      if (!isEmpty(passwordIsMatch) && !passwordIsMatch)
        setFieldError('password', 'Password is incorrect!')
      setSubmitting(false)
    })
}
