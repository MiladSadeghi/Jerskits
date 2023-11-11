import { IProduct } from '../../shared/types/Product.types'
import tw from 'twin.macro'
import provideBrandLogo from '../../utils/brand-logo'
import { calculateDiscount } from '../../utils/utils'
import {
  ProductDiscountPercent,
  ProductDiscountPrice,
  ProductPrice
} from './Product.styles'
import { Link } from 'react-router-dom'

type Props = {
  product: IProduct
  key?: string
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card className='h-full group'>
      <div className='h-[440px] w-full relative bg-neutral-light-grey flex items-end justify-center'>
        <CardImage src={product.gallery[0]} alt={product.name} />
        <BrandLogo
          src={provideBrandLogo(product.brand)}
          alt={`${product.brand} logo`}
        />
      </div>
      <CardContent>
        <ProductName to={`/${product.slug}`} className='line-clamp-2'>
          {product.name}
        </ProductName>
        <ProductType>{product.type}</ProductType>
        <div className='flex items-center'>
          <ProductPrice $isDiscount={product.offPrice !== 0}>
            ${product.price}
          </ProductPrice>
          {product.offPrice !== 0 && (
            <div className='flex items-center justify-between w-full'>
              <ProductDiscountPrice>${product.offPrice}</ProductDiscountPrice>
              <ProductDiscountPercent>
                {calculateDiscount(product.price, product.offPrice)}% Off
              </ProductDiscountPercent>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const Card = tw.div`min-w-full w-full xl:min-w-[380px] flex flex-col justify-between`
const CardImage = tw.img`w-[70%] object-contain object-bottom bg-neutral-light-grey h-[440px]`
const BrandLogo = tw.img`absolute left-7 top-7 w-10 h-10 duration-150 opacity-30 group-hover:opacity-70`
const ProductName = tw(
  Link
)`text-primary-black text-text-xl leading-9 font-bold`
const CardContent = tw.div`w-full h-full mt-2.5 gap-y-2.5 flex flex-col justify-between`
const ProductType = tw.p`text-neutral-dark-grey text-text-lg font-normal leading-7`

export default ProductCard
