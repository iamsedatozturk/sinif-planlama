import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { useStoreActions, useStoreState } from '../../store/store'
import {
  FailedSignInResponse,
  SignInCredential,
  SignInResponse,
  SignUpCredential,
} from '../../@types/auth'
import { signIn, signOut } from '../../services/auth.service'
import { isLoginSuccess } from '../../proxy/account/models'
import { REDIRECT_URL_KEY } from '../../constants/app.constant'
import appConfig from '../../configs/app.config'
import { register } from '../../services/account.service'

type Status = 'success' | 'failed' | 'error'

function useAuth() {
  const { signIn: signInStore, signOut: signOutStore } = useStoreActions((actions) => actions.auth)

  const navigate = useNavigate()

  const query = useQuery()

  const { token, signedIn } = useStoreState((state) => state.auth.session)

  const handleToken = ({
    token,
    refreshToken,
    expiresIn,
  }: {
    token: string
    refreshToken: string
    expiresIn: number
  }) => {
    const tokenDetails: any = jwtDecode(token)
    signInStore({
      session: { token, refreshToken, expiresIn, expire: tokenDetails?.exp, signedIn: true },
      user: {
        id: tokenDetails?.sub,
        userName: tokenDetails?.preferred_username,
        email: tokenDetails?.email,
        authority: [tokenDetails?.role],
        name: `${tokenDetails?.given_name} ${tokenDetails?.family_name}`.trim(),
      },
    })
  }

  const _signIn = async (
    values: SignInCredential,
  ): Promise<{
    status: Status
    message?: string
    data?: SignInResponse | FailedSignInResponse
  }> => {
    try {
      const resp = await signIn(values)
      if (isLoginSuccess(resp.data)) {
        const {
          access_token: token,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = resp.data
        handleToken({ token, refreshToken, expiresIn })

        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(redirectUrl ?? appConfig.authenticatedEntryPath)

        return {
          status: 'success',
          message: '',
        }
      } else {
        return {
          status: 'failed',
          data: resp?.data,
        }
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'error',
        message: errors?.response?.data?.message || errors.toString(),
      }
    }
  }

  const _signUp = async (values: SignUpCredential) => {
    try {
      const resp = await register(values)
      if (resp.data) {
        const {
          access_token: token,
          refresh_token: refreshToken,
          expires_in: expiresIn,
        } = resp?.data as any
        handleToken({ token, refreshToken, expiresIn })
        // if (resp.data.user) {
        //   setUser(
        //     resp.data.user || {
        //       avatar: '',
        //       userName: 'Anonymous',
        //       authority: ['USER'],
        //       email: '',
        //       name: '',
        //     },
        //   )
        // }
        setTimeout(
          () => navigate(query.get(REDIRECT_URL_KEY) ?? appConfig.authenticatedEntryPath),
          10000,
        )
        return {
          status: 'success',
          message: '',
        }
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      const err =
        errors?.response?.data?.error?.details ||
        errors?.response?.data?.error?.message ||
        errors?.response?.data?.message ||
        errors.toString()

      return {
        status: 'error',
        message: err,
      }
    }
  }

  const _signOut = async () => {
    await signOut({ token })
    signOutStore()
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  return {
    authenticated: token && signedIn,
    signIn: _signIn,
    signUp: _signUp,
    signOut: _signOut,
  }
}

export default useAuth
