import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  sendAccountConfirmationCode,
  verifyAccountConfirmationCode,
} from '../../services/account.service'

function useAccount() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const sendConfirmationCode = async (values: any) => {
    try {
      await sendAccountConfirmationCode(values)
      setError('')
      setMessage('Verification code has been sent to your e-mail address.')
    } catch (error: any) {
      setMessage('')
      setError(error?.response?.data?.message || error.toString())
      return {
        status: 'failed',
        message: error?.response?.data?.message || error.toString(),
      }
    }
  }

  const verifyConfirmationCode = async (userId: string, token: string) => {
    if (!userId || !token) {
      return {
        status: 'failed',
        message: 'Invalid user and token',
      }
    }
    try {
      const result = await verifyAccountConfirmationCode(userId, token)
      if (result.data) {
        setError('')
        setMessage('Your account is confirmed')
        setTimeout(() => {
          navigate('/account/login')
        }, 3000)
      } else {
        throw new Error('Invalid token')
      }
      return result
    } catch (error: any) {
      const err =
        error?.response?.data?.error?.message || error?.response?.data?.message || error.toString()
      setMessage('')
      setError(err)
      return {
        status: 'failed',
        message: err,
      }
    }
  }

  return {
    verifyConfirmationCode,
    sendConfirmationCode,
    message,
    error,
  }
}

export default useAccount
