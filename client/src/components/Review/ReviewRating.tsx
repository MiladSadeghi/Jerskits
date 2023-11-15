import { Star } from '../../icons'

type Props = {
  rate: number
  changeRate?: (arg: number) => void
  disabled?: boolean
  error?: boolean
}

const ReviewRating = ({ rate, changeRate, disabled, error }: Props) => {
  return (
    <div className='flex gap-x-5'>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1
        return (
          <label key={index} data-testid='rating'>
            <input
              type='radio'
              value={givenRating}
              className='hidden'
              onClick={() => {
                if (!disabled) changeRate?.(givenRating)
              }}
            />
            <div className={`${disabled ? '' : 'cursor-pointer'}`}>
              <Star
                colorsClassName={
                  givenRating < rate || givenRating === rate
                    ? 'fill-primary-black stroke-secondary-primary-black'
                    : error
                    ? ' stroke-red-500'
                    : 'fill-white stroke-primary-black'
                }
              />
            </div>
          </label>
        )
      })}
    </div>
  )
}

export default ReviewRating
