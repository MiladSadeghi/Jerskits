import { forwardRef, useEffect } from 'react'
import { useAppSelector } from '../App/hooks'
import { RootState } from '../App/store'
import { Close } from '../icons'
import { BagDropdown, ProductCard } from '../components'
import {
  useRemoveFromBagMutation,
  useUpdateBagItemQuantityMutation,
  useUpdateBagItemSizeMutation
} from '../services'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'
import { cn } from '../utils/utils'

type Props = {
  isBagModal: [boolean, setState<boolean>]
}

const toastStyle = {
  style: {
    minWidth: '150px'
  }
}

const sizeOptionsValue = Array(10)
  .fill(null)
  .map((_, index) => String(index + 1))

const BagModal = forwardRef<HTMLDialogElement, Props>(({ isBagModal }, ref) => {
  const [bagModal, setIsBagModal] = isBagModal
  const bag = useAppSelector((state: RootState) => state.user.bag)

  const [updateQty, { isLoading: isQtyUpdating, originalArgs: qtyArg }] =
    useUpdateBagItemQuantityMutation()
  const [updateSize, { isLoading: isSizeUpdating, originalArgs: sizeArg }] =
    useUpdateBagItemSizeMutation()
  const [removeFromBag, { isLoading: isRemoving, originalArgs: removeArg }] =
    useRemoveFromBagMutation()

  const handleUpdateSize = (newSize: string, productId: string) => {
    if (!newSize) return
    toast.promise(
      updateSize({ productId, newSize: newSize }),
      {
        loading: 'Wait...',
        success: 'Size updated',
        error: 'Something went wrong'
      },
      toastStyle
    )
  }

  const handleUpdateQuantity = (newQty: string, productId: string) => {
    if (!newQty) return
    toast.promise(
      updateQty({ productId, quantity: Number(newQty) }),
      {
        loading: 'Wait...',
        success: 'Quantity updated',
        error: 'Something went wrong'
      },
      toastStyle
    )
  }

  const handleRemoveFromBag = (productId: string) => {
    removeFromBag({ productId: productId })
  }

  const isBagUpdating = (productId: string) => {
    return (
      (isRemoving && removeArg?.productId === productId) ||
      (isSizeUpdating && sizeArg?.productId === productId) ||
      (isQtyUpdating && qtyArg?.productId === productId)
    )
  }

  const isProductRemoving = (productId: string) => {
    return removeArg?.productId === productId && isRemoving
  }

  useEffect(() => {
    if (bag?.items?.length === 0) {
      setIsBagModal(false)
    }
  }, [bag])

  return (
    <dialog
      open={true}
      className={cn(
        'w-full md:w-[460px] h-screen fixed top-0 bg-white z-[800] p-[30px] transition-all space-y-7 -right-[200%] duration-1000',
        { 'right-0 duration-500': bagModal }
      )}
      ref={ref}
      style={{ insetInlineStart: 'unset' }}
    >
      <div className='flex items-center justify-between '>
        <h1 className='text-lg font-bold text-primary-black'>
          Bag ({bag?.items?.length} Item)
        </h1>
        <button
          onClick={() => setIsBagModal(false)}
          aria-label='close bag modal'
        >
          <Close />
        </button>
      </div>
      <div className='flex flex-col h-full gap-y-7 pb-[30px]'>
        <div className='h-[75%] overflow-y-auto space-y-7'>
          {bag?.items?.map((item) => (
            <div className='space-y-7' key={item.product._id}>
              <ProductCard
                product={item.product}
                isLikeable={false}
                size={item.size}
                isMini={true}
              />
              <div className='flex flex-col gap-y-4'>
                <div className='flex w-full gap-x-4'>
                  <BagDropdown
                    currentValue={{
                      label: `Size : ${item.size}`,
                      value: item.size
                    }}
                    optionsValue={item.product.size}
                    label='Size'
                    handleUpdate={handleUpdateSize}
                    isDisabled={isBagUpdating(item.product._id)}
                    productId={item.product._id}
                    menuPosition='left'
                  />
                  <BagDropdown
                    currentValue={{
                      label: `Qty : ${item.quantity}`,
                      value: String(item.quantity)
                    }}
                    optionsValue={sizeOptionsValue}
                    label='Qty'
                    handleUpdate={handleUpdateQuantity}
                    isDisabled={isBagUpdating(item.product._id)}
                    productId={item.product._id}
                    menuPosition='right'
                  />
                </div>
                <button
                  className='flex items-center justify-center w-full font-bold text-white transition-all bg-red-500 h-14 disabled:opacity-50'
                  onClick={() => handleRemoveFromBag(item.product._id)}
                  disabled={isBagUpdating(item.product._id)}
                >
                  {isProductRemoving(item.product._id) ? (
                    <SpinnerCircular
                      size={35}
                      thickness={100}
                      speed={100}
                      color={'rgba(239, 68, 68, 1)'}
                      secondaryColor='rgba(0, 0, 0, 0.6)'
                    />
                  ) : (
                    'REMOVE'
                  )}
                </button>
              </div>
              <div className='border-bottom w-full h-0.5 bg-neutral-soft-grey' />
            </div>
          ))}
        </div>
        <div className='h-[30%] space-y-5'>
          <div className='flex justify-between'>
            <p className='leading-6 text-neutral-dark-grey'>Subtotal</p>
            <span className='font-bold text-primary-black'>
              ${(bag?.subTotal ?? 0).toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between'>
            <p className='leading-6 text-neutral-dark-grey'>
              Estimated Delivery & Handling
            </p>
            <span className='font-bold text-primary-black'>$10</span>
          </div>
          <div className='flex justify-between'>
            <p className='leading-6 text-neutral-dark-grey'>Total</p>
            <span className='font-bold text-primary-black'>
              ${((bag?.subTotal ?? 0) + 10).toFixed(2)}
            </span>
          </div>
          <Link
            to='/checkout'
            className='block w-full py-4 font-bold leading-6 text-center text-white bg-primary-black'
          >
            CHECKOUT
          </Link>
        </div>
      </div>
    </dialog>
  )
})

export default BagModal
