import { IOrderDelivery } from '../../shared/types/Order.types'
import { formatDuration } from '../../utils/utils'

type Props = {
  delivery: IOrderDelivery
  editHandler: () => void
}

const DeliverySummary = ({ delivery, editHandler }: Props) => {
  return (
    <div>
      <div className='flex items-center justify-between mb-7'>
        <h1 className='text-text-2xl font-bold leading-[48px] text-primary-black'>
          Delivery
        </h1>
        <button
          className='text-base leading-6 text-neutral-dark-grey'
          onClick={editHandler}
        >
          Edit
        </button>
      </div>
      <p>{formatDuration(delivery.arriveTime)}</p>
    </div>
  )
}

export default DeliverySummary
