import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './api'
import {
  TSubmitReviewRequest,
  TSubmitReviewResponse
} from '../shared/types/Review.types'

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    submitReview: build.mutation<
      TSubmitReviewResponse,
      TSubmitReviewRequest & { slug: string }
    >({
      query({ text, rating, slug }) {
        return {
          url: `/review/${slug}`,
          method: 'POST',
          body: {
            text,
            rating
          }
        }
      }
    })
  })
})

export { reviewApi }
export const { useSubmitReviewMutation } = reviewApi
