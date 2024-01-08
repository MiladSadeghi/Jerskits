import { Link, useParams } from 'react-router-dom'
import { Checkmark } from '../../icons'

const OrderConfirmation = () => {
  document.title = 'Checkout Confirmed'
  const { orderId } = useParams()

  return (
    <div className='relative w-full h-screen'>
      <div className='absolute w-full h-full max-w-4xl -translate-x-1/2 -translate-y-1/2 shadow-lg top-1/2 left-1/2 md:w-full max-h-[550px] rounded-lg bg-[url(/images/hideout.svg)] bg-[length:120px] bg-opacity-40 bg-center'>
        <div className='h-full bg-gradient-to-b from-white/60 to-white to-[56%] flex items-center justify-center flex-col p-24'>
          <div className='p-6 mb-10 rounded-full bg-primary-black'>
            <Checkmark className='w-20 h-20 ' strokeColor='white' />
          </div>
          <div>
            <h1 className='mb-6 text-3xl font-bold leading-relaxed tracking-wide text-center text-primary-black font-BebasNeue'>
              Woohoo! We're pumped for your order. Don't lose your ID: #
              {orderId}. We'll get it to you quick!
            </h1>
            <div className='grid grid-cols-12 gap-4'>
              <Link
                to='/profile/orders/ongoing'
                replace={true}
                className='w-full col-span-5 gap-4 py-4 text-xl font-bold tracking-wide text-center font-BebasNeue bg-slate-100'
              >
                View Order
              </Link>
              <Link
                to='/'
                replace={true}
                className='col-span-7 py-4 text-xl font-bold tracking-wider text-center text-white font-BebasNeue bg-primary-black'
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
