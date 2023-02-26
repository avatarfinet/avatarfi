import isEmpty from 'is-empty'
import { setAuth } from '@/store'
import { NextRouter } from 'next/router'
import { postLogin, postResetPwd, postSignup } from '@/lib'
import { clientAuth } from '@/utils'

// SIGNUP
export function handleSignup({
  values,
  setSubmitting,
  setFieldError,
  router,
  dispatch,
}: {
  values: {
    name?: string
    surname?: string
    phone?: string
    email: string
    password: string
  }
  setSubmitting: any
  setFieldError: any
  router: NextRouter
  dispatch: Dispatch
}) {
  const { name, surname, phone, email, password } = values
  // HANDLE POST USER
  postSignup({
    email,
    name,
    surname,
    phone,
    password,
  })
    .then(() => {
      // AUTO LOGIN
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
        .catch(() => setSubmitting(false))
      router.push('/')
    })
    .catch((err) => {
      if (err?.response?.data?.emailIsRegistered)
        setFieldError('email', 'This email is already registered to Avatarfi!')
      setSubmitting(false)
    })
}

// LOGIN
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
        setFieldError('email', 'This email is not registered to Avatarfi!')
      if (!isEmpty(passwordIsMatch) && !passwordIsMatch)
        setFieldError('password', 'Password is incorrect!')
      setSubmitting(false)
    })
}

// RESET PASSWORD
export function handleForgotPwd({
  email,
  setSubmitting,
  setFieldError,
  setHelperText,
}: {
  email: string
  setSubmitting: any
  setFieldError: any
  setHelperText: any
}) {
  postResetPwd({
    email,
    origin: window.origin,
    userAgent: navigator.userAgent,
  })
    .then((res) => {
      setHelperText(res.data)
      setSubmitting(false)
    })
    .catch((err) => {
      const { emailIsRegistered } = err?.response?.data
      if (!isEmpty(emailIsRegistered) && !emailIsRegistered)
        setFieldError('email', 'This email is not registered to Avatarfi!')
      setSubmitting(false)
    })
}
