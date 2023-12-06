import { createApi } from '@reduxjs/toolkit/query/react'
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
      },
      transformErrorResponse(baseQueryReturnValue) {
        return baseQueryReturnValue.data
      }
    })
  })
})

export { reviewApi }
export const { useSubmitReviewMutation } = reviewApi
