import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { setAuthStatus } from '../App/feature/auth/authSlice'
import { toast } from 'react-hot-toast'

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: 'include'
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQueryWithAuth(
      {
        url: `/auth/refresh`,
        method: 'GET'
      },
      api,
      extraOptions
    )

    if (!refreshResult.error) {
      result = await baseQueryWithAuth(args, api, extraOptions)
    } else {
      api.dispatch(setAuthStatus(false))
      toast('Sorry but you should login again!', { icon: '⚠️' })
    }
  }

  return result
}
