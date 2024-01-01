import { IProduct } from '../../shared/types/Product.types'
import { ProductDiscountPercent, ProductDiscountPrice, ProductPrice } from '..'
import { calculateDiscount } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { Heart } from '../../icons'
import { useRemoveProductFromFavoritesMutation } from '../../services'

type Props = {
  product: IProduct
  removable: boolean
  key?: string | number
  testId?: string
  size?: string
  qty?: number
}

const ProductMiniCard = ({ product, removable, testId, size, qty }: Props) => {
  const [remove, { isLoading }] = useRemoveProductFromFavoritesMutation()
  const isOffPrice = product.offPrice !== 0
  const price = qty
    ? (product.price * qty).toLocaleString('en-US', {
        maximumFractionDigits: 2
      })
    : product.price
  const discount = qty
    ? calculateDiscount(product.price * qty, product.offPrice)
    : calculateDiscount(product.price, product.offPrice)
  return (
    <div data-testid={testId} className='relative flex items-start gap-x-5'>
      <div className='flex items-center justify-center  max-w-[6rem] h-[8rem] bg-neutral-light-grey relative'>
        <img
          src={product.gallery[0]}
          alt={product.name}
          className='object-contain'
        />
        {removable && (
          <button
            className='absolute z-50 flex items-center justify-center w-8 h-8 bg-white shadow-lg bottom-2 right-2 disabled:opacity-50'
            aria-label={`like-${product.name}`}
            disabled={isLoading}
            onClick={() => remove(product._id)}
          >
            <Heart fill={true} />
          </button>
        )}
      </div>
      <div className='flex items-start flex-col justify-between gap-y-2.5'>
        <Link
          to={`/${product.slug}`}
          className='font-bold leading-6 text-left text-primary-black line-clamp-2'
        >
          {product.name}
        </Link>
        <div className='flex'>
          <p className='text-base leading-6 capitalize text-neutral-dark-grey'>
            {product.type} {!!size && `. Size ${size}`}{' '}
            {!!qty && `. QTY ${qty}`}
          </p>
        </div>
        <div className='flex justify-between w-full'>
          <ProductPrice className='text-lg' isDiscount={isOffPrice}>
            ${price}
          </ProductPrice>
          {isOffPrice && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice className='!text-lg'>
                ${product.offPrice}
              </ProductDiscountPrice>
              <ProductDiscountPercent className='!text-lg'>
                {discount}% Off
              </ProductDiscountPercent>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductMiniCard
