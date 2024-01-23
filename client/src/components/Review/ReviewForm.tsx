import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TSubmitReviewSchema } from '../../shared/types/Review.types'
import { yupResolver } from '@hookform/resolvers/yup'
import ReviewRating from './ReviewRating'
import { useSubmitReviewMutation } from '../../services/reviewApi'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'
import SubmitReviewSchema from './ReviewSchema'

type Props = {
  productSlug?: string
  textAreaRows?: number
  isReset?: boolean
}

const getRatingMessage = (rate: number) => {
  switch (rate) {
    case 1:
      return 'Very Bad!'
    case 2:
      return 'Bad!'
    case 3:
      return 'Good!'
    case 4:
      return 'Nice!'
    case 5:
      return 'Excellent!'
  }
}

const ReviewForm = ({ productSlug, textAreaRows = 6, isReset }: Props) => {
  let { slug } = useParams()
  if (productSlug) {
    slug = productSlug
  }

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

  useEffect(() => {
    reset()
  }, [isReset])

  const onSubmitReview = async (formValues: TSubmitReviewSchema) => {
    await submitReview({
      rating: formValues.rate,
      text: formValues.text,
      slug: slug as string
    })
  }
  return (
    <form
      className='flex flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmitReview)}
    >
      <div>
        <h5 className='text-sm font-medium text-primary-black leading-[19.6px] mb-2.5'>
          Rate
        </h5>
        <Controller
          name='rate'
          control={control}
          render={({ field }) => (
            <div className='flex items-center'>
              <ReviewRating
                rate={field.value}
                onRateChange={field.onChange}
                error={!!errors.rate}
              />
              <p className='text-sm font-medium text-neutral-grey ml-2.5 leading-[21px]'>
                {getRatingMessage(field.value)}
              </p>
            </div>
          )}
        />
      </div>
      <label htmlFor='review-textarea' className='font-medium w-fit'>
        Review
      </label>
      <textarea
        rows={textAreaRows}
        placeholder='Your review'
        id='review-textarea'
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
  )
}

export default ReviewForm
