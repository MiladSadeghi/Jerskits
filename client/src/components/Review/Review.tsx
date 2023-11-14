import { TReview } from '../../shared/types/Review.types'
import { ReviewRating } from '..'

type Props = {
  review: TReview
  key: string | number
}

const Review = ({ review }: Props) => {
  const createdAtTime = new Date(review.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
  return (
    <>
      <div className='border-b border-neutral-grey-grey h-0.5 my-7' />
      <div data-testid='review' className='flex flex-col mb-7 gap-y-3'>
        <h1 className='font-bold leading-7 capitalize text-primary-black'>
          {review.user.fullName}
        </h1>
        <div className='flex items-center justify-between'>
          <ReviewRating rate={review.rating} disabled={true} />
          <p className='text-neutral-dark-grey'>{createdAtTime}</p>
        </div>
        <p className='leading-6 text-primary-black'>{review.text}</p>
      </div>
    </>
  )
}

export default Review
