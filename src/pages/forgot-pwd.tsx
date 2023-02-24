import { useRouter } from 'next/router'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { postResetPwd } from '@/lib'

const ForgotPassword = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required!')
        .email(`Must be a valid email`)
        .test(
          'checkEmailRegistered',
          'This email is not registered!',
          (value) =>
            fetch(`is-email-registerd/${value}`).then(async (res) => {
              const { isEmailUnique } = await res.json()
              return isEmailUnique
            })
        ),
    }),
    onSubmit: (values, _) => {
      postResetPwd(values.email)
        .then(() => {
          router.push('/login')
        })
        .catch((err) => console.log(err))
    },
  })

  return (
    <Stack spacing={3}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <InputGroup>
            <InputLeftAddon>Email</InputLeftAddon>
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
        <Button
          colorScheme="twitter"
          size="sm"
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </Stack>
  )
}

export default ForgotPassword
