import { forwardRef } from 'react'
import { useAppSelector } from '../../App/hooks'
import { Link } from 'react-router-dom'
import { Close } from '../../icons'
import { cn } from '../../utils/utils'
import { ProductCard } from '..'

type Props = {
  isOpen: boolean
  handleBagModal: setState<boolean>
  closePopup: () => void
}

const BagPopup = forwardRef<HTMLDialogElement, Props>(
  ({ isOpen, handleBagModal, closePopup }, ref) => {
    const bag = useAppSelector((state) => state.user.bag)
    return (
      <dialog
        ref={ref}
        open={true}
        className={cn(
          'fixed md:absolute z-[800] md:z-[99] right-0 bg-white md:top-[75px] md:bottom-[unset] w-full md:w-[460px] p-[30px] space-y-7 -bottom-full md:hidden duration-1000',
          { 'bottom-0 md:block duration-500': isOpen }
        )}
        style={{ insetInlineStart: 'unset' }}
      >
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold text-primary-black'>Bag</h1>
          <button onClick={closePopup} className='md:hidden'>
            <Close />
          </button>
        </div>
        <div className='flex flex-col gap-y-5'>
          {(bag && bag?.items?.length) !== 0 ? (
            bag?.items.map((item) => (
              <ProductCard
                key={item.product._id}
                product={item.product}
                isLikeable={false}
                size={item.size}
                isMini={true}
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
            to={'/checkout'}
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
