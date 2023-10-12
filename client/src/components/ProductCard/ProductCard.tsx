import { IProduct } from '../../shared/types/Product.types'
import tw, { styled } from 'twin.macro'
import provideBrandLogo from '../../utils/brand-logo'

type Props = {
  product: IProduct
  key?: string
}

function calculateDiscount(price: number, discountPrice: number): string {
  const discountPercent = (discountPrice / price) * 100
  return discountPercent.toFixed(0)
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card className='group'>
      <div className='h-[440px] w-full relative bg-neutral-light-grey flex items-end justify-center'>
        <CardImage src={product.gallery[0]} alt={product.name} />
        <BrandLogo
          src={provideBrandLogo(product.brand)}
          alt={`${product.brand} logo`}
        />
      </div>
      <CardContent>
        <ProductName className='line-clamp-2'>{product.name}</ProductName>
        <div className='flex'>
          <ProductType>{product.type}</ProductType>
        </div>
        <div className='flex items-center'>
          <Price $isDiscount={product.offPrice !== 0}>${product.price}</Price>
          {product.offPrice !== 0 && (
            <div className='flex items-center w-full justify-between'>
              <DiscountPrice>${product.offPrice}</DiscountPrice>
              <DiscountPercent>
                {calculateDiscount(product.price, product.offPrice)}% Off
              </DiscountPercent>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const Card = tw.div`min-w-full sm:min-w-[380px]`
const CardImage = tw.img`w-[70%] object-cover object-bottom bg-neutral-light-grey `
const BrandLogo = tw.img`absolute left-7 top-7 w-10 h-10 duration-150 opacity-30 group-hover:opacity-70`
const ProductName = tw.h1`text-primary-black text-text-xl leading-9 font-bold`
const CardContent = tw.div`w-full mt-2.5 gap-y-2.5`
const ProductType = tw.p`text-neutral-dark-grey text-text-lg font-normal leading-7`
const Price = styled.h2<{ $isDiscount: boolean }>`
  ${tw`relative font-bold leading-9 text-text-xl`}
  ${({ $isDiscount }) =>
    $isDiscount
      ? tw`text-neutral-grey before:(absolute top-1/2 left-0 w-full h-0.5 bg-neutral-grey)`
      : tw`text-primary-black`}
`
const DiscountPrice = tw.h3`ml-2.5 font-bold text-primary-black text-text-xl`
const DiscountPercent = tw.p`font-bold text-text-lg text-secondary-red leading-7`

export default ProductCard
