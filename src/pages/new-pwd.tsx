import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

import { Input, InputGroup, InputPrep } from '../../components/ui/Inputs'
import { AlertCard } from '../../components/ui/Cards'
import { TextBtn } from '../../components/ui/Buttons'

const NewPass = () => {
  const history = useHistory()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  const timerRef = useRef()

  useEffect(
    () => () => {
      clearTimeout(timerRef.current)
    },
    []
  )

  const PostData = () => {
    axios
      .post('/api/users/new-pwd', { password, token })
      .then((res) => {
        const data = res.data
        if (data.error) {
          setSuccessMsg(false)
          setErrorMsg(true)
        } else {
          setErrorMsg(false)
          setSuccessMsg(true)
          // set a time before we redirect the user to login page
          timerRef.current = setTimeout(() => {
            history.push('/login')
          }, 3000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="dfc jc-c ai-c p-3 mxw-30r ma">
      <div className="p-3">
        {password !== '' && confirmPassword !== '' ? (
          password !== confirmPassword ? (
            <AlertCard variant="warning">
              Confirm password doesnt match the password — check it out !
            </AlertCard>
          ) : null
        ) : null}
        {/* Handle Error Notification if there is any */}
        {errorMsg ? (
          <AlertCard variant="danger">
            Session expired ! Try Again with a new Request — check it Again !
          </AlertCard>
        ) : null}
        {/* Handle Success Notification */}
        {successMsg ? (
          <AlertCard variant="success">
            Password Updated successfully — check it out !
          </AlertCard>
        ) : null}
        <h4 className="mb-5 mt-3">
          <b>Submit Reset</b> below
        </h4>
      </div>
      <form className="dfc jc-c ai-c" noValidate>
        <InputGroup className="mb-3">
          <InputPrep variant="pillL">Password</InputPrep>
          <Input
            variant="pillR"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-5">
          <InputPrep variant="pillL">Confirm Password</InputPrep>
          <Input
            variant="pillR"
            name="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <TextBtn
          variant="info"
          size="sm"
          disabled={password !== '' && confirmPassword !== '' ? false : true}
          onClick={() => PostData()}
        >
          Submit The New Password
        </TextBtn>
      </form>
    </div>
  )
}

export default NewPass
