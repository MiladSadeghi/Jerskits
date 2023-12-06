import { forwardRef } from 'react'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import ProductMiniCard from '../Products/ProductMiniCard'
import { Link } from 'react-router-dom'
import { Close } from '../../icons'

type Props = {
  isOpen: boolean
  handleBagModal: setState<boolean>
  handlePopup: setState<keyof TPopups>
}

const BagPopup = forwardRef<HTMLDialogElement, Props>(
  ({ isOpen, handleBagModal, handlePopup }, ref) => {
    const bag = useAppSelector((state: RootState) => state.user.bag)
    return (
      <dialog
        ref={ref}
        open={true}
        className={`fixed md:absolute z-[800] md:z-[99] right-0 bg-white md:top-[75px] md:bottom-[unset] w-full md:w-[460px] p-[30px] space-y-7 ${
          isOpen
            ? 'bottom-0 md:block duration-500'
            : '-bottom-full md:hidden duration-1000'
        }`}
        css='inset-inline-start: unset;'
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold text-primary-black'>Bag</h1>
          <button onClick={() => handlePopup('bag')} className='md:hidden'>
            <Close />
          </button>
        </div>
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
            className='w-full py-[18px] font-bold text-center border border-primary-black text-primary-black disabled:opacity-50'
            onClick={() => handleBagModal(true)}
            disabled={bag?.items.length === 0}
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
  }
)

export default BagPopup
