import { Button } from '..'

type Props = {
  orderId: number
  orderArriveDate: Date
  orderTotalPrice: number
  onDelivery?: boolean
  isLastItem: boolean
  onReview?: () => void
}

function formatDate(date: Date) {
  const inputDate = new Date(date)

  const day = ('0' + inputDate.getDate()).slice(-2)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const month = months[inputDate.getMonth()]
  const year = inputDate.getFullYear()
  const hours = ('0' + inputDate.getHours()).slice(-2)
  const minutes = ('0' + inputDate.getMinutes()).slice(-2)
  const AmPm = inputDate.getHours() >= 12 ? 'PM' : 'AM'

  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${AmPm}`
  return formattedDate
}

const OrderSummary = ({
  orderId,
  orderArriveDate,
  orderTotalPrice,
  onDelivery = false,
  isLastItem,
  onReview
}: Props) => {
  return (
    <div>
      <div className='space-y-2.5'>
        <h1 className='text-2xl font-bold leading-9 text-primary-black'>
          No Order: #{orderId}
        </h1>
        <div className='flex items-center py-2.5 px-5 bg-neutral-light-grey'>
          <p className='flex-1 text-lg font-semibold leading-[27px] text-primary-black'>
            {onDelivery ? 'On Delivery' : 'Done'}
          </p>
          <img
            src={onDelivery ? '/images/truck.svg' : '/images/circle-check.svg'}
          />
        </div>
        <p className='leading-6 text-neutral-dark-grey'>
          {formatDate(orderArriveDate)}
        </p>
        <h2 className='text-2xl font-semibold leading-9 text-primary-black'>
          ${orderTotalPrice.toFixed(2)}
        </h2>
        {!!onReview && (
          <Button
            onClick={onReview}
            className='bg-white border text-primary-black border-neutral-soft-grey'
          >
            GIVE REVIEW
          </Button>
        )}
      </div>
      {!isLastItem && (
        <div className='border-t border-neutral-soft-grey my-7' />
      )}
    </div>
  )
}

export default OrderSummary
