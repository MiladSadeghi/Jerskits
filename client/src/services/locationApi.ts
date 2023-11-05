import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './api'

type LocationResponse = {
  error: string
  country: Option[]
  state: Option[]
  city: Option[]
}
export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getLocation: build.query<LocationResponse, string>({
      query(url) {
        return {
          url: url,
          method: 'GET'
        }
      }
    })
  })
})

export const { useLazyGetLocationQuery } = locationApi
