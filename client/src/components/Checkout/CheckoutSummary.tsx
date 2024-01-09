import { useState } from 'react'
import { ArrowDown } from '../../icons'
import { TBag } from '../../shared/types/User.types'
import { cn } from '../../utils/utils'
import { ProductCard } from '..'

type Props = {
  bag: TBag
  deliveryPrice: number
}

const CheckoutSummary = ({ bag, deliveryPrice = 10 }: Props) => {
  const [open, setOpen] = useState(false)

  const subTotal = bag.subTotal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const total = (bag.subTotal + 90 + deliveryPrice).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <div>
      <div
        className={cn(
          'fixed invisible top-0 left-0 h-screen opacity-0 z-40 w-full bg-black/50 transition-all',
          { 'opacity-100 visible': open }
        )}
      />
      <div
        className={cn(
          'fixed bg-white bottom-0 lg:static border-t border-neutral-soft-grey w-full lg:border-none transition-all z-[80]'
        )}
      >
        <button
          className={
            'lg:hidden flex items-center justify-between text-2xl leading-9 text-primary-black w-full h-24 px-7 z-20'
          }
          onClick={() => setOpen(!open)}
        >
          Order Summary
          <ArrowDown width={30} height={30} />
        </button>
        <h1 className='text-text-2xl font-bold leading-[48px] text-primary-black hidden lg:block mb-7'>
          Order Summary
        </h1>
        <div
          className={cn('min-h-[0] max-h-0 transition-all duration-500 ease', {
            'max-h-[0]': !open,
            'max-h-96': open
          })}
        >
          <div className={'pt-0 space-y-5 p-7 lg:p-0'}>
            <div className='flex items-center justify-between'>
              <h3 className='leading-6 text-neutral-dark-grey '>Subtotal</h3>
              <span className='font-bold leading-6 text-primary-black'>
                ${subTotal}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='leading-6 text-neutral-dark-grey'>Duties & Tax</h3>
              <span className='font-bold leading-6 text-primary-black'>
                $90
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='leading-6 text-neutral-dark-grey'>Delivery</h3>
              <span className='font-bold leading-6 text-primary-black'>
                ${deliveryPrice}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold leading-9 text-primary-black'>
                Total
              </h2>
              <span className='text-2xl font-bold leading-6 text-primary-black'>
                ${total}
              </span>
            </div>

            <div>
              {bag.items.map((item) => (
                <div key={item._id}>
                  <div className='w-full h-px bg-neutral-soft-grey my-7' />
                  <ProductCard
                    product={item.product}
                    isLikeable={false}
                    size={item.size}
                    quantity={item.quantity}
                    isMini={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
