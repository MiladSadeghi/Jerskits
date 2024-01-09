import { useState } from 'react'
import { IProduct } from '../../../shared/types/Product.types'
import provideBrandLogo from '../../../utils/brand-logo'
import { calculateDiscount, cn } from '../../../utils/utils'
import {
  Button,
  ProductDiscountPercent,
  ProductDiscountPrice,
  ProductPrice,
  ProductSize
} from '../../../components'
import { useAppSelector } from '../../../App/hooks'
import toast from 'react-hot-toast'
import { RootState } from '../../../App/store'
import {
  useAddProductToFavoritesMutation,
  useAddToBagMutation,
  useRemoveProductFromFavoritesMutation
} from '../../../services'
import { SpinnerCircular } from 'spinners-react'

type TProductShopCardProps = {
  product: IProduct
}

const ProductShopCard = ({ product }: TProductShopCardProps) => {
  const { brand, name, type, offPrice, price, size } = product
  const [selectedSize, setSelectedSize] = useState<string>()
  const isFavorite = useAppSelector(
    (state: RootState) => state.user.favorites
  ).some((favorite) => favorite?._id === product?._id)

  const isOnBag = useAppSelector(
    (state: RootState) => state.user.bag?.items
  )?.some((item) => item.product._id === product._id)

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const [addProductToFavorites, { isLoading: isAdding }] =
    useAddProductToFavoritesMutation()

  const [removeProductFromFavorites, { isLoading: isRemoving }] =
    useRemoveProductFromFavoritesMutation()

  const [addToBag, { isLoading: isAddingToBag }] = useAddToBagMutation()

  const isDiscount = offPrice !== 0

  const handleFavorites = () => {
    if (!isAuthenticated) {
      toast('You should sign in first', { icon: '⚠️' })
    }

    if (isFavorite) {
      removeProductFromFavorites(product._id)
    } else {
      addProductToFavorites(product._id)
    }
  }

  const handleAddToBag = () => {
    if (!isAuthenticated) {
      toast('You should sign in first', { icon: '⚠️' })
    }

    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }
    addToBag({ productId: product._id, size: selectedSize })
  }

  return (
    <div className='w-full row-span-2 mt-12 xl:w-96 lg:mt-0 xl:justify-self-end'>
      <div className='sticky top-0'>
        <img
          className='mb-6 opacity-40'
          width={50}
          height={50}
          src={provideBrandLogo(brand)}
          alt='brand logo'
        />
        <h1 className='text-[32px] leading-[48px] font-bold mb-2.5'>{name}</h1>
        <div className='flex items-center justify-between w-full mb-2.5'>
          <h2 className='text-lg capitalize text-neutral-dark-grey'>{type}</h2>
        </div>
        <div className='flex items-center'>
          <ProductPrice isDiscount={isDiscount}>{price}</ProductPrice>
          {offPrice !== 0 && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice>{offPrice}</ProductDiscountPrice>
              <ProductDiscountPercent>
                {calculateDiscount(price, offPrice)}
              </ProductDiscountPercent>
            </div>
          )}
        </div>
        <div className='h-0.5 my-7 border-bottom-1 bg-neutral-light-grey' />
        <div className='flex justify-between mb-5'>
          <h4 className='text-lg font-bold text-primary-black'>Select Size</h4>
          <h4 className='text-lg font-semibold text-neutral-grey'>
            Size Guide
          </h4>
        </div>
        <div className='mb-7 grid grid-cols-4 gap-x-2.5 gap-y-5'>
          {size.map((size) => (
            <div key={size}>
              <ProductSize
                type='button'
                active={size === selectedSize}
                onClick={() => setSelectedSize(size)}
                aria-label={`size-${size}`}
              >
                {size}
              </ProductSize>
            </div>
          ))}
        </div>
        <Button
          className='mb-4 text-white bg-primary-black'
          aria-label='add product to bag'
          onClick={handleAddToBag}
          disabled={isAddingToBag || isOnBag}
          title={isOnBag ? 'Product already in bag' : 'Add to bag'}
        >
          {!isOnBag && isAddingToBag ? (
            <SpinnerCircular
              size={35}
              thickness={100}
              speed={100}
              color={'#262D33'}
              secondaryColor='rgba(0, 0, 0, 0.6)'
            />
          ) : (
            'ADD TO BAG'
          )}
        </Button>
        <Button
          className={cn(
            'border bg-white text-primary-black border-neutral-soft-grey',
            {
              'bg-red-600 text-white': isFavorite
            }
          )}
          aria-label='add product to favorite'
          onClick={handleFavorites}
          disabled={isAdding || isRemoving}
        >
          {isAdding || isRemoving ? (
            <SpinnerCircular
              size={35}
              thickness={100}
              speed={100}
              color={isFavorite ? '#fff' : '#262D33'}
              secondaryColor='rgba(0, 0, 0, 0.10)'
            />
          ) : (
            'FAVORITE'
          )}
        </Button>
      </div>
    </div>
  )
}

export default ProductShopCard
