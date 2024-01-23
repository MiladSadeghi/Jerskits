import { IProduct } from '../../shared/types/Product.types'
import provideBrandLogo from '../../utils/brand-logo'
import { calculateDiscount, cn } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { Heart } from '../../icons'
import { ProductDiscountPercent, ProductDiscountPrice, ProductPrice } from '..'

type Props = {
  product: IProduct
  key?: string | number
  testId?: string
  size?: string
  quantity?: number
  isLikeable?: boolean
  isLikeLoading?: boolean
  isCurrentLiked?: boolean
  removeFavorite?: () => void
  addFavorite?: () => void
  isMini: boolean
  width?: number
}

const ProductCard = ({
  product,
  testId,
  size,
  quantity,
  isLikeable,
  isLikeLoading,
  isCurrentLiked,
  removeFavorite,
  addFavorite,
  isMini,
  width
}: Props) => {
  const isOffPrice = product.offPrice !== 0
  const price = quantity
    ? (product.price * quantity).toLocaleString('en-US', {
        maximumFractionDigits: 2
      })
    : product.price
  const discount = quantity
    ? calculateDiscount(product.price * quantity, product.offPrice)
    : calculateDiscount(product.price, product.offPrice)
  return (
    <div
      data-testid={testId}
      style={{ ...(width && { maxWidth: `${width}px`, flex: '0 0 auto' }) }}
      className={cn(
        'group w-full h-full flex flex-col justify-between gap-5 relative',
        {
          'flex-row max-h-[134px]': isMini,
          'lg:max-h-[635px]': !isMini
        }
      )}
    >
      <img
        className={cn(
          'w-full h-full object-contain bg-neutral-light-grey px-5 pt-12 ',
          {
            'px-5 pt-12 max-h-[350px] lg:max-h-[460px]': !isMini,
            'px-2.5 pt-2.5 w-[120px] h-[134px]': isMini
          }
        )}
        src={product.gallery[0]}
      />
      <img
        className={cn(
          'absolute w-10 h-10 duration-150 left-7 top-7 opacity-30 group-hover:opacity-70',
          { hidden: isMini }
        )}
        src={provideBrandLogo(product.brand)}
        alt={`${product.brand} logo`}
      />
      {isLikeable && (
        <button
          className={cn(
            'absolute z-50 flex items-center justify-center w-8 h-8 bg-white shadow-lg disabled:opacity-50 transition-all',
            { 'bottom-4 left-[75px]': isMini, 'top-4 right-4': !isMini }
          )}
          aria-label={`like-${product.name}`}
          disabled={isLikeLoading}
          onClick={isCurrentLiked ? removeFavorite : addFavorite}
        >
          <Heart width={24} height={24} fill={isCurrentLiked} />
        </button>
      )}
      <div
        className={cn('flex flex-col justify-between gap-2.5', {
          'flex-1': isMini
        })}
      >
        <Link
          to={`/${product.slug}`}
          className={cn('text-primary-black font-bold text-2xl line-clamp-2 ', {
            'lg:text-2xl text-lg md:h-16 !leading-7 md:!leading-9': !isMini,
            'text-base h-12 !leading-6': isMini
          })}
        >
          {product.name}
        </Link>
        <div>
          <p
            className={cn(
              'text-neutral-dark-grey text-base lg:text-lg leading-7 capitalize',
              {
                '!leading-6': isMini,
                'text-sm lg:text-sm': !!size || !!quantity
              }
            )}
          >
            {product.type} {!!size && `. Size ${size}`}{' '}
            {!!quantity && `. QTY ${quantity}`}
          </p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <ProductPrice
            className={cn({
              '!leading-7 text-lg font-semibold': isMini,
              hidden: isOffPrice && (!!size || !!quantity),
              'hidden md:block': isOffPrice
            })}
            isDiscount={isOffPrice}
          >
            {price}
          </ProductPrice>
          {isOffPrice && (
            <div className='md:ml-2.5 flex items-center justify-between w-full'>
              <ProductDiscountPrice
                className={cn({ '!leading-7 text-lg font-semibold': isMini })}
              >
                {product.offPrice}
              </ProductDiscountPrice>
              <ProductDiscountPercent
                className={cn({ '!leading-7 text-base': isMini })}
              >
                {discount}
              </ProductDiscountPercent>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
