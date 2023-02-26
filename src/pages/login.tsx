import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { handleLogin } from '@/lib'
import Link from 'next/link'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required!')
        .email(`Must be a valid email`),
      password: Yup.string().required('Password is required!'),
    }),
    onSubmit: (values, actions) => {
      const { email, password } = values
      const { setSubmitting, setFieldError } = actions
      handleLogin({
        email,
        password,
        setSubmitting,
        setFieldError,
        dispatch,
      })
    },
  })

  useEffect(() => {
    if (auth.id) router.push('/')
  }, [auth.id, router])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} align="center">
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
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
        <FormControl
          isInvalid={formik.touched.password && !!formik.errors.password}
        >
          <FormLabel htmlFor="password">Password</FormLabel>
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
        <ChakraLink as={Link} href="/forgot-pwd" color={'blue.300'}>
          Forgot Password?
        </ChakraLink>
        <Button
          w={250}
          colorScheme="twitter"
          size="sm"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Login
        </Button>
      </Stack>
    </form>
  )
}

export default Login
