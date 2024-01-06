import { useOutletContext } from 'react-router-dom'
import { IOrder } from '../../shared/types/Order.types'
import { OrderSummary } from '..'
import { OrderReviewModal } from '../../modals'
import { useState } from 'react'

type TOutlet = {
  history: IOrder[]
}

const OrdersHistory = () => {
  const { history } = useOutletContext<TOutlet>()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false)
  const [orderIdx, setOrderIdx] = useState<number>(0)
  return (
    <div>
      <OrderReviewModal
        isOpen={isReviewModalOpen}
        handleCloseModal={() => setIsReviewModalOpen(false)}
        orderItems={history[orderIdx]?.orderItems.items}
      />
      {history.map((order, index) => (
        <OrderSummary
          key={order.orderNumber}
          orderArriveDate={order.delivery.arriveTime}
          orderId={order.orderNumber}
          orderTotalPrice={order.orderItems.subTotal}
          onDelivery={false}
          isLastItem={history.length === index + 1}
          onReview={() => {
            setIsReviewModalOpen(true)
            setOrderIdx(index)
          }}
        />
      ))}
    </div>
  )
}

export default OrdersHistory
