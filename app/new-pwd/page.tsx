import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { postNewPwd } from '@/lib'
import { AvatarSpinner } from '@/components'

export default function Signup() {
  const router = useRouter()
  const { pwdResetToken } = router.query
  const [helperText, setHelperText] = useState('')
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required!')
        .test(
          'len',
          'Must be more then 5 characters',
          (val) => !!val && val.length > 5
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'Passwords must match!'
      ),
    }),
    onSubmit: (values, actions) => {
      const { setSubmitting, setFieldError } = actions
      postNewPwd({ pwdResetToken, password: values.password })
        .then((res) => {
          console.log('fire')
          setHelperText(res.data)
          router.push('/login')
          setSubmitting(false)
        })
        .catch((err) => {
          setFieldError('password', err.response.data)
          setSubmitting(false)
        })
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <FormControl
            isInvalid={formik.touched.password && !!formik.errors.password}
          >
            <FormLabel htmlFor="password">New Password*</FormLabel>
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
            <FormLabel htmlFor="password">Confirm Password*</FormLabel>
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
            <FormHelperText
              display={!helperText ? 'none' : 'initial'}
              color={'green.300'}
            >
              {helperText}
            </FormHelperText>
          </FormControl>
          <Button
            colorScheme="twitter"
            size="sm"
            type="submit"
            spinner={<AvatarSpinner />}
            isLoading={formik.isSubmitting}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
