import { rest } from 'msw'
import { TSubmitReviewResponse } from '../../shared/types/Review.types'

export const submitReviewMock = rest.post(
  `${import.meta.env.VITE_SERVER_URL}/review/:slug`,
  async (req, res, ctx) => {
    const { slug } = req.params
    const { rating, text } = await req.json()
    if (rating && text && slug) {
      return res(
        ctx.status(200),
        ctx.json<TSubmitReviewResponse>({
          error: false,
          message: 'Review submitted',
          newReview: {
            _id: '5',
            rating,
            text,
            createdAt: new Date().toISOString(),
            productId: '2',
            updatedAt: new Date().toISOString(),
            user: {
              fullName: 'Milad Sadeghi',
              firstName: 'milad',
              lastName: 'sadeghi',
              avatar: 'IDK.jpg'
            }
          }
        })
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          error: true,
          message: 'Invalid review'
        })
      )
    }
  }
)
