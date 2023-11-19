import { IProduct } from '../../shared/types/Product.types'
import { ProductDiscountPercent, ProductDiscountPrice, ProductPrice } from '..'
import { calculateDiscount } from '../../utils/utils'
import { Link } from 'react-router-dom'

type Props = {
  product: IProduct
  key: string | number
}

const ProductMiniCard = ({ product }: Props) => {
  return (
    <Link to={`/${product.slug}`} className='flex items-start gap-x-5'>
      <div className='flex items-start max-w-[6rem] max-h-[8rem] bg-neutral-light-grey'>
        <img
          src={product.gallery[0]}
          alt={product.name}
          className='object-contain w-full h-full'
        />
      </div>
      <div className='flex flex-col justify-between gap-y-2.5'>
        <h2 className='font-bold leading-6 text-primary-black text line-clamp-2'>
          {product.name}
        </h2>
        <p className='text-base leading-6 capitalize text-neutral-dark-grey'>
          {product.type}
        </p>
        <div className='flex items-center'>
          <ProductPrice
            className='!text-lg'
            $isDiscount={product.offPrice !== 0}
          >
            ${product.price}
          </ProductPrice>
          {product.offPrice !== 0 && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice className='!text-lg'>
                ${product.offPrice}
              </ProductDiscountPrice>
              <ProductDiscountPercent className='!text-lg'>
                {calculateDiscount(product.price, product.offPrice)}% Off
              </ProductDiscountPercent>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductMiniCard
