import { useAppSelector } from '../../../App/hooks'
import { RootState } from '../../../App/store'
import { TReview } from '../../../shared/types/Review.types'
import { Review, ReviewForm } from '../../../components'

type Props = {
  reviews: TReview[]
}

const ProductReviews = ({ reviews }: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return (
    <div className='h-full max-h-full min-h-full'>
      {isAuthenticated && <ReviewForm />}
      {reviews.map((review) => (
        <Review review={review} key={review._id} />
      ))}
    </div>
  )
}

export default ProductReviews
