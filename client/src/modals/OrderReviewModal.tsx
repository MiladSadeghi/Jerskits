import { useState } from 'react'
import { ProductCard, ReviewForm } from '../components'
import { ArrowRight, Close } from '../icons'
import { TBagItem } from '../shared/types/User.types'
import { cn } from '../utils/utils'
import { useAppSelector } from '../App/hooks'
import {
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation
} from '../services'
import ProductMiniCard from '../components/Products/ProductMiniCard'

type Props = {
  orderItems: TBagItem[]
  isOpen: boolean
  handleCloseModal: () => void
}

const OrderReviewModal = ({ orderItems, isOpen, handleCloseModal }: Props) => {
  const [orderIdx, setOrderIdx] = useState<number>(0)
  const userFavoriteProductsId = useAppSelector(
    (state) => state.user.favorites
  ).map((product) => product._id)
  const [addProductToFavorites, { isLoading: isAdding }] =
    useAddProductToFavoritesMutation()

  const [removeProductFromFavorites, { isLoading: isRemoving }] =
    useRemoveProductFromFavoritesMutation()

  const likeLoading = isAdding || isRemoving

  return (
    <dialog
      open={true}
      className={cn(
        'fixed invisible top-0 left-0 h-screen opacity-0 z-[101] w-full flex items-end lg:items-center justify-center bg-black/50 transition-all',
        { 'opacity-100 visible': isOpen }
      )}
    >
      <div className='w-full max-w-[791px] bg-white p-7 relative'>
        <div className='space-y-7'>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg font-bold leading-7 text-primary-black'>
              Give Review
            </h1>
            <button onClick={handleCloseModal}>
              <Close />
            </button>
          </div>
          <div className='flex flex-col w-full lg:flex-row gap-7'>
            <div className='w-full lg:flex max-w-[281px] hidden'>
              <ProductCard
                likeable={true}
                isLiked={userFavoriteProductsId.includes(
                  orderItems[orderIdx].product._id
                )}
                product={orderItems[orderIdx].product}
                likeLoading={likeLoading}
                favoriteHandler={() =>
                  userFavoriteProductsId.includes(
                    orderItems[orderIdx].product._id
                  )
                    ? removeProductFromFavorites(
                        orderItems[orderIdx].product._id
                      )
                    : addProductToFavorites(orderItems[orderIdx].product._id)
                }
              />
            </div>
            <div className='lg:hidden'>
              <ProductMiniCard
                product={orderItems[orderIdx].product}
                removable={false}
                likeable={true}
                isLiked={userFavoriteProductsId.includes(
                  orderItems[orderIdx].product._id
                )}
                likeLoading={likeLoading}
                favoriteHandler={() =>
                  userFavoriteProductsId.includes(
                    orderItems[orderIdx].product._id
                  )
                    ? removeProductFromFavorites(
                        orderItems[orderIdx].product._id
                      )
                    : addProductToFavorites(orderItems[orderIdx].product._id)
                }
              />
            </div>
            <div className='w-full'>
              <ReviewForm
                productSlug={orderItems[orderIdx].product.slug}
                textAreaRows={1}
              />
            </div>
          </div>
        </div>
        <div className='absolute flex items-center gap-5 -top-12 lg:bottom-7 right-7'>
          <button
            onClick={() => setOrderIdx(orderIdx - 1)}
            disabled={orderIdx === 0 || orderItems.length === 1}
            className='p-1 -rotate-180 bg-white border rounded-full disabled:opacity-50'
          >
            <ArrowRight width={24} height={24} />
          </button>
          <button
            onClick={() => setOrderIdx(orderIdx + 1)}
            disabled={
              orderIdx === orderItems.length - 1 || orderItems.length === 1
            }
            className='p-1 bg-white border rounded-full disabled:opacity-50'
          >
            <ArrowRight width={24} height={24} />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default OrderReviewModal
