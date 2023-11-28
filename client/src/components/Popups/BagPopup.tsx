import { forwardRef } from 'react'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import ProductMiniCard from '../Products/ProductMiniCard'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
}

const BagPopup = forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const { open } = props
  const bag = useAppSelector((state: RootState) => state.user.bag)
  return (
    <dialog
      ref={ref}
      open={open}
      className={`absolute z-[99] right-0 bg-white top-[75px] w-[460px] p-[30px] space-y-7`}
      css='inset-inline-start: unset;'
    >
      <h1 className='text-lg font-bold text-primary-black'>Bag</h1>
      <div className='flex flex-col gap-y-5'>
        {(bag && bag?.items.length) !== 0 ? (
          bag?.items.map((item) => (
            <ProductMiniCard
              key={item.product._id}
              product={item.product}
              removable={false}
              size={item.size}
            />
          ))
        ) : (
          <p className='text-primary-black'>Empty bag</p>
        )}
      </div>
      <div className='flex items-center justify-between gap-x-5'>
        <button
          type='button'
          className='w-full py-[18px] font-bold text-center border border-primary-black text-primary-black'
        >
          VIEW BAG ({bag?.items.length})
        </button>
        <Link
          to={''}
          className='w-full py-[18px] font-bold text-center text-white border bg-primary-black'
        >
          CHECKOUT
        </Link>
      </div>
    </dialog>
  )
})

export default BagPopup
