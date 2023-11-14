import { useAppSelector } from '../../../App/hooks'
import { RootState } from '../../../App/store'
import {
  TReview,
  TSubmitReviewSchema
} from '../../../shared/types/Review.types'
import { Review, ReviewRating, SubmitReviewSchema } from '../../../components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { useSubmitReviewMutation } from '../../../services/reviewApi'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'

type Props = {
  reviews: TReview[]
}

const ProductReviews = ({ reviews }: Props) => {
  const { slug } = useParams()
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset
  } = useForm<TSubmitReviewSchema>({
    resolver: yupResolver(SubmitReviewSchema)
  })
  const [submitReview, { isLoading, data, error, isError }] =
    useSubmitReviewMutation()

  useEffect(() => {
    if (data) {
      toast.success(data.message)
      reset()
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message)
    }
  }, [isError])

  const onSubmitReview = async (formValues: TSubmitReviewSchema) => {
    await submitReview({
      rating: formValues.rate,
      text: formValues.text,
      slug: slug as string
    })
  }

  return (
    <div className='h-full max-h-full min-h-full'>
      {isAuthenticated && (
        <>
          <form
            className='flex flex-col gap-y-5'
            onSubmit={handleSubmit(onSubmitReview)}
          >
            <div className='flex'>
              <Controller
                name='rate'
                control={control}
                render={({ field }) => (
                  <ReviewRating
                    rate={field.value}
                    changeRate={field.onChange}
                    error={!!errors.rate}
                  />
                )}
              />
            </div>
            <textarea
              rows={10}
              placeholder='Your review'
              className={`text-lg resize-none focus:ring-0  ${
                errors.text?.message
                  ? 'border-red-600 focus:border-red-600'
                  : 'border-primary-black/50 focus:border-primary-black'
              }`}
              {...register('text')}
            />

            <button
              type='submit'
              className='flex items-center justify-center w-full py-4 text-lg font-semibold text-white bg-primary-black disabled:opacity-60'
              aria-label='submit review'
              disabled={!isValid}
            >
              {isLoading ? (
                <SpinnerCircular
                  size={28}
                  thickness={95}
                  speed={95}
                  color='rgba(38, 45, 51, 0.90)'
                  secondaryColor='rgba(255, 255, 255, 1)'
                />
              ) : (
                'Submit Review'
              )}
            </button>
          </form>
        </>
      )}
      {reviews.map((review) => (
        <Review review={review} key={review._id} />
      ))}
    </div>
  )
}

export default ProductReviews
