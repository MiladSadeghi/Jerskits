import { Dispatch, SetStateAction, forwardRef, useEffect } from 'react'
import { useAppSelector } from '../App/hooks'
import { RootState } from '../App/store'
import { Close } from '../icons'
import ProductMiniCard from '../components/Products/ProductMiniCard'
import { BagDropdown } from '../components'
import { SingleValue } from 'react-select'
import {
  useRemoveFromBagMutation,
  useUpdateBagItemQuantityMutation,
  useUpdateBagItemSizeMutation
} from '../services'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'

type Props = {
  isBagModal: [boolean, Dispatch<SetStateAction<boolean>>]
}

const BagModal = forwardRef<HTMLDialogElement, Props>((props, ref) => {
  const [bagModal, setIsBagModal] = props.isBagModal
  const bag = useAppSelector((state: RootState) => state.user.bag)
  const [updateQty, { isLoading: isQtyUpdating, originalArgs: qtyArg }] =
    useUpdateBagItemQuantityMutation()
  const [updateSize, { isLoading: isSizeUpdating, originalArgs: sizeArg }] =
    useUpdateBagItemSizeMutation()
  const [removeFromBag, { isLoading: isRemoving, originalArgs: removeArg }] =
    useRemoveFromBagMutation()

  const toastStyle = {
    style: {
      minWidth: '150px'
    }
  }

  const handleUpdateSize = (
    newSize: SingleValue<Option>,
    productId: string
  ) => {
    if (!newSize) return
    toast.promise(
      updateSize({ productId, newSize: newSize?.value }),
      {
        loading: 'Wait...',
        success: 'Size updated',
        error: 'Something went wrong'
      },
      toastStyle
    )
  }

  const handleUpdateQuantity = (
    newQty: SingleValue<Option>,
    productId: string
  ) => {
    if (!newQty) return
    toast.promise(
      updateQty({ productId, quantity: Number(newQty?.value) }),
      {
        loading: 'Wait...',
        success: 'Quantity updated',
        error: 'Something went wrong'
      },
      toastStyle
    )
  }

  useEffect(() => {
    if (bag?.items.length === 0) {
      setIsBagModal(false)
    }
  }, [bag])

  return (
    <dialog
      open={true}
      className={`w-[460px] h-screen fixed top-0 bg-white z-[800] p-[30px] transition-all space-y-7 ${
        bagModal ? 'right-0 duration-500' : '-right-full duration-1000'
      }`}
      ref={ref}
      css='inset-inline-start: unset;'
    >
      <div className='flex items-center justify-between '>
        <h1 className='text-lg font-bold text-primary-black'>
          Bag ({bag?.items.length} Item)
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
          {bag?.items.map((item) => (
            <div className='space-y-7' key={item.product._id}>
              <ProductMiniCard
                product={item.product}
                removable={false}
                size={item.size}
              />
              <div className='flex flex-col gap-y-4'>
                <div className='flex w-full px-0.5 gap-x-4'>
                  <BagDropdown
                    value={{ label: `Size : ${item.size}`, value: item.size }}
                    optionValues={item.product.size}
                    label='Size'
                    handleChange={handleUpdateSize}
                    disabled={isSizeUpdating}
                    productId={item.product._id}
                    updatingProductId={sizeArg?.productId}
                  />
                  <BagDropdown
                    value={{
                      label: `Qty : ${item.quantity}`,
                      value: String(item.quantity)
                    }}
                    optionValues={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10'
                    ]}
                    label='Qty'
                    handleChange={handleUpdateQuantity}
                    disabled={isQtyUpdating}
                    productId={item.product._id}
                    updatingProductId={qtyArg?.productId}
                  />
                </div>
                <button
                  className='flex items-center justify-center w-full font-bold text-white transition-all bg-red-500 h-14 disabled:opacity-50'
                  onClick={() => removeFromBag(item.product._id)}
                  disabled={removeArg === item.product._id && isRemoving}
                >
                  {removeArg === item.product._id && isRemoving ? (
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
        <div className='h-[25%] space-y-5'>
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
