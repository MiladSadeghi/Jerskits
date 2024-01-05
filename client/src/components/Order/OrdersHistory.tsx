import { useOutletContext } from 'react-router-dom'
import { IOrder } from '../../shared/types/Order.types'
import { OrderSummary } from '..'

type TOutlet = {
  history: IOrder[]
}

const OrdersHistory = () => {
  const { history } = useOutletContext<TOutlet>()
  return (
    <div>
      {history.map((order, index) => (
        <OrderSummary
          key={order.orderNumber}
          orderArriveDate={order.delivery.arriveTime}
          orderId={order.orderNumber}
          orderTotalPrice={order.orderItems.subTotal}
          onDelivery={false}
          isLastItem={history.length === index + 1}
          orderItems={order.orderItems.items}
        />
      ))}
    </div>
  )
}

export default OrdersHistory
