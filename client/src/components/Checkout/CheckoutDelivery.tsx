import { IOrderDelivery } from '../../shared/types/Order.types'
import { cn, calculateDateDuration, formatDuration } from '../../utils/utils'

type Props = {
  delivery: IOrderDelivery
  onChange: (delivery: IOrderDelivery) => void
}

const arrivalTimes: IOrderDelivery[] = [
  {
    arriveTime: calculateDateDuration(new Date(), 5),
    price: 10,
    type: 'standard'
  },
  {
    arriveTime: calculateDateDuration(new Date(), 1),
    price: 20,
    type: 'express'
  }
]

const CheckoutDelivery = ({ delivery, onChange }: Props) => {
  return (
    <div className='space-y-7'>
      <h1 className='text-primary-black text-text-2xl leading-[48px] font-bold'>
        Choose Arrival Time
      </h1>

      {arrivalTimes.map(({ arriveTime, price, type }) => (
        <button
          key={type}
          aria-pressed={type === delivery.type}
          onClick={() =>
            onChange({
              arriveTime,
              price,
              type
            })
          }
          className={cn(
            'px-5 py-3 border border-neutral-soft-grey flex items-center justify-between w-full',
            {
              'border-primary-black': type === delivery.type
            }
          )}
        >
          <div className='flex flex-col items-baseline space-y-2.5'>
            <p className='text-base font-semibold text-primary-black leading-[21px]'>
              {formatDuration(arriveTime)}
            </p>
            <span className='text-lg font-bold text-neutral-grey'>
              ${price}
            </span>
          </div>
          {type === delivery.type && (
            <input
              type='checkbox'
              defaultChecked={true}
              aria-checked={true}
              className={cn(
                'rounded-full !outline-none focus:!outline-none focus:!border-none text-primary-black w-5 h-5 border-none ring-1 ring-primary-black focus:ring-1 focus:ring-primary-black focus:ring-offset-0'
              )}
            />
          )}
        </button>
      ))}
    </div>
  )
}

export default CheckoutDelivery
