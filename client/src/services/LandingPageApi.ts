import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './api'
import {
  TKidBrandCollectionRequest,
  TKidBrandCollectionResponse,
  TLandingPageResponse
} from '../shared/types/LandingPage.types'

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
    }),
    getKidBrandCollection: build.query<
      TKidBrandCollectionResponse,
      TKidBrandCollectionRequest
    >({
      query({ brand }) {
        return {
          url: `/kid-collection/${brand}`,
          method: 'GET'
        }
      }
    })
  })
})

export { landingPageApi }
export const { useGetLandingPageQuery, useLazyGetKidBrandCollectionQuery } =
  landingPageApi
