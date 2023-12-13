import { createApi } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-hot-toast'
import { baseQueryWithAuth } from './api'
import {
  TAuthResponse,
  TAuthResponseError,
  TSignInRequest,
  TSignUpRequest
} from '../shared/types/Auth.types'
import { IProfile } from '../shared/types/Profile.types'
import { setAuthStatus } from '../App/feature/auth/authSlice'
import { clearProfile } from '../App/feature/profile/profileSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    SignUp: build.mutation<TAuthResponse, TSignUpRequest>({
      query({ email, password, fullName }) {
        return {
          url: '/auth/sign-up',
          method: 'POST',
          body: { email, password, fullName }
        }
      }
    }),
    SignIn: build.mutation<
      TAuthResponse & { profile: IProfile },
      TSignInRequest
    >({
      query({ email, password }) {
        return {
          url: '/auth/sign-in',
          method: 'POST',
          body: { email, password }
        }
      }
    }),
    SignOut: build.mutation<void, void>({
      query() {
        return {
          url: '/auth/logout',
          method: 'DELETE'
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setAuthStatus(false))
          dispatch(clearProfile())
          toast.success('You have successfully signed out')
        } catch (error: unknown) {
          const typedError = error as TAuthResponseError
          if (typedError?.status === 'FETCH_ERROR') {
            toast.error("Can't login, try again later or refresh the page")
          } else {
            toast.error('Sign out failed. Please try again later')
          }
        }
      }
    })
  })
})

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
  authApi
