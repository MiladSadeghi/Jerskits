import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './api'
import { TLandingPageResponse } from '../shared/types/LandingPage.types'

const landingPageApi = createApi({
  reducerPath: 'landingPageApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getLandingPage: build.query<TLandingPageResponse, void>({
      query() {
        return {
          url: '/',
          method: 'GET'
        }
      }
    })
  })
})

export { landingPageApi }
export const { useGetLandingPageQuery } = landingPageApi
