import { useOutletContext } from 'react-router-dom'
import { IOrder } from '../../shared/types/Order.types'
import { OrderSummary } from '..'

type TOutlet = {
  ongoing: IOrder[]
}

const OngoingOrders = () => {
  const { ongoing } = useOutletContext<TOutlet>()
  return (
    <div>
      {ongoing.map((order, index) => (
        <OrderSummary
          key={order.orderNumber}
          orderArriveDate={order.delivery.arriveTime}
          orderId={order.orderNumber}
          orderTotalPrice={order.orderItems.subTotal}
          onDelivery={true}
          isLastItem={ongoing.length === index + 1}
        />
      ))}
    </div>
  )
}

export default OngoingOrders
