import * as Yup from 'yup'
import SubmitReviewSchema from '../../components/Review/ReviewSchema'

export type TReview = {
  _id: string
  user: {
    fullName: string
    firstName?: string
    lastName?: string
    avatar?: string
  }
  text: string
  rating: number
  productId: string
  createdAt: string
  updatedAt: string
}

export type TSubmitReviewRequest = {
  text: string
  rating: number
}

export type TSubmitReviewResponse = {
  error: boolean
  message: string
  newReview: TReview
}

export type TSubmitReviewSchema = Yup.InferType<typeof SubmitReviewSchema>
