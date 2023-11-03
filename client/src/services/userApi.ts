import { createApi } from '@reduxjs/toolkit/query/react'
import { IGetUserResponse } from '../shared/types/User.types'
import { baseQueryWithReauth } from './api'
import { setProfile } from '../App/feature/profile/profileSlice'
import toast from 'react-hot-toast'
import { setAuthStatus } from '../App/feature/auth/authSlice'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUser: build.query<IGetUserResponse, void>({
      query() {
        return {
          url: '/user'
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProfile(data.profile))
          dispatch(setAuthStatus(true))
        } catch (error: unknown) {
          if (typeof error === 'object' && error !== null) {
            const err = error as Record<string, unknown>
            if (err.error && typeof err.error === 'object') {
              const errStatus = err.error as Record<string, unknown>
              if (errStatus.status === 'FETCH_ERROR') {
                toast.error('Cant login, try again later or refresh the page')
              } else if (errStatus.status === 404) {
                toast.error('cant get your profile!, please refresh the page')
              }
            }
          }
        }
      }
    })
  })
})

export const { useGetUserQuery } = userApi

export default userApi
