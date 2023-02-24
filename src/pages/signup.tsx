import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { phoneRegExp } from '@/utils'
import { postSignup } from '@/lib'

export default function Signup() {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required!')
        .email(`Must be a valid email`),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid!'),
      password: Yup.string()
        .required('Password is required!')
        .test(
          'len',
          'Must be more then 5 characters',
          (val) => !!val && val.length > 5
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match!'
      ),
    }),
    onSubmit: (values, actions) => {
      const { email, name, surname, phone, password } = values
      postSignup({ email, name, surname, phone, password })
        .then((res) => {
          actions.setSubmitting(false)
          router.push('/login')
        })
        .catch((err) => {
          if (err?.response?.data?.emailIsRegistered)
            actions.setFieldError('email', 'This email is registered!')
          actions.setSubmitting(false)
        })
    },
  })

  useEffect(() => {
    if (auth.id) {
      router.push('/')
    }
  }, [auth.id, router])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl
            isInvalid={formik.touched.email && !!formik.errors.email}
          >
            <FormLabel fontSize={'xs'} htmlFor="email">
              E-mail*
            </FormLabel>
            <InputGroup>
              <Input
                name="email"
                type="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'} htmlFor="name">
              Name ( optional )
            </FormLabel>
            <InputGroup>
              <Input
                name="name"
                type="text"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'xs'} htmlFor="name">
              Surname ( optional )
            </FormLabel>
            <InputGroup>
              <Input
                name="surname"
                type="text"
                placeholder="surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.phone && !!formik.errors.phone}
          >
            <FormLabel fontSize={'xs'} htmlFor="name">
              Phone Number ( optional )
            </FormLabel>
            <InputGroup>
              <Input
                name="phone"
                type="tel"
                placeholder="phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && !!formik.errors.password}
          >
            <FormLabel fontSize={'xs'} htmlFor="password">
              Password*
            </FormLabel>
            <InputGroup>
              <Input
                name="password"
                type="password"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
          >
            <FormLabel fontSize={'xs'} htmlFor="password">
              Confirm Password*
            </FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="twitter"
            size="sm"
            type="submit"
            isLoading={formik.isSubmitting}
          >
            Signup
          </Button>
        </Stack>
      </form>
    </>
  )
}
