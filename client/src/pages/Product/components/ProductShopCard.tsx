import { useState } from 'react'
import { IProduct } from '../../../shared/types/Product.types'
import provideBrandLogo from '../../../utils/brand-logo'
import { calculateDiscount } from '../../../utils/utils'
import {
  ProductDiscountPercent,
  ProductDiscountPrice,
  ProductPrice,
  ProductShopCardBtn,
  ProductShopCardSizeBtn
} from '../../../components'

type TProductShopCardProps = {
  product: IProduct
}

const ProductShopCard = ({ product }: TProductShopCardProps) => {
  const { brand, name, type, offPrice, price, size } = product
  const [selectedSize, setSelectedSize] = useState<string>()
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
          <ProductPrice $isDiscount={offPrice !== 0}>${price}</ProductPrice>
          {offPrice !== 0 && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice>${offPrice}</ProductDiscountPrice>
              <ProductDiscountPercent>
                {calculateDiscount(price, offPrice)}% Off
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
            <ProductShopCardSizeBtn
              $activeSize={size === selectedSize}
              onClick={() => setSelectedSize(size)}
              key={size}
            >
              {size}
            </ProductShopCardSizeBtn>
          ))}
        </div>
        <ProductShopCardBtn
          className='mb-4 text-white bg-primary-black'
          aria-label='add product to bag'
        >
          ADD TO BAG
        </ProductShopCardBtn>
        <ProductShopCardBtn
          className='border border-neutral-soft-grey'
          aria-label='add product to favorite'
        >
          FAVORITE
        </ProductShopCardBtn>
      </div>
    </div>
  )
}

export default ProductShopCard
