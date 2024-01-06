import { IProduct } from '../../shared/types/Product.types'
import provideBrandLogo from '../../utils/brand-logo'
import { calculateDiscount } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { Heart } from '../../icons'
import { ProductDiscountPercent, ProductDiscountPrice, ProductPrice } from '..'

type Props = {
  product: IProduct
  key?: string
  isLiked?: boolean
  likeable?: boolean
  favoriteHandler?: () => void
  likeLoading?: boolean
}

const ProductCard = ({
  product,
  likeable,
  likeLoading,
  isLiked,
  favoriteHandler
}: Props) => {
  const isOffPrice = product.offPrice !== 0
  return (
    <div className='flex flex-col justify-between w-full h-full max-w-full group'>
      <div className='h-[440px] w-full relative bg-neutral-light-grey flex items-end justify-center'>
        <img
          className='w-[70%] object-contain object-bottom bg-neutral-light-grey h-[440px]'
          src={product.gallery[0]}
          alt={product.name}
        />
        <img
          className='absolute w-10 h-10 duration-150 left-7 top-7 opacity-30 group-hover:opacity-70'
          src={provideBrandLogo(product.brand)}
          alt={`${product.brand} logo`}
        />
        {likeable && (
          <button
            className='absolute z-50 flex items-center justify-center w-8 h-8 bg-white shadow-lg top-4 right-4 disabled:opacity-50'
            aria-label={`like-${product.name}`}
            disabled={likeLoading}
            onClick={favoriteHandler}
          >
            <Heart width={24} height={24} fill={isLiked} />
          </button>
        )}
      </div>
      <div className='w-full h-full mt-2.5 gap-y-2.5 flex flex-col justify-between'>
        <Link
          to={`/${product.slug}`}
          className='font-bold leading-9 line-clamp-2 text-primary-black text-text-xl'
          aria-label={`go to ${`product.name`} details`}
        >
          {product.name}
        </Link>
        <p className='font-normal leading-7 text-neutral-dark-grey text-text-lg'>
          {product.type}
        </p>
        <div className='flex items-center'>
          <ProductPrice isDiscount={isOffPrice}>${product.price}</ProductPrice>
          {product.offPrice !== 0 && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice>${product.offPrice}</ProductDiscountPrice>
              <ProductDiscountPercent>
                {calculateDiscount(product.price, product.offPrice)}% Off
              </ProductDiscountPercent>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
