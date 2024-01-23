import { Star } from '../../icons'

type Props = {
  rate: number
  onRateChange?: (arg: number) => void
  disabled?: boolean
  error?: boolean
}

const ReviewRating = ({ rate, onRateChange, disabled, error }: Props) => {
  const handleRateChange = (givenRating: number) => {
    if (!disabled) onRateChange?.(givenRating)
  }

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
              onClick={() => handleRateChange(givenRating)}
            />
            <div className={`${disabled ? '' : 'cursor-pointer'}`}>
              <Star
                colorsClassName={
                  givenRating <= rate
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
