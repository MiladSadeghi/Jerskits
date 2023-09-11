import { createApi } from '@reduxjs/toolkit/query/react'
import { IGetUserResponse } from '../shared/types/User.types'
import { baseQueryWithReauth } from './api'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUser: build.query<IGetUserResponse, void>({
      query() {
        return {
          url: '/user'
        }
      }
    })
  })
})

export const { useGetUserQuery } = userApi

export default userApi
