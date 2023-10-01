import { IProduct } from '../../shared/types/Product.types'
import tw, { styled } from 'twin.macro'

type Props = {
  product: IProduct
}

function calculateDiscount(price: number, discountPrice: number): number {
  const discountPercent = (discountPrice / price) * 100
  return discountPercent
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <div className='relative h-[460px]'>
        <CardImage src={product.gallery[0]} alt={product.name} />
      </div>
      <CardContent>
        <ProductName>{product.name}</ProductName>
        <div className='flex'>
          <ProductType>{product.type}</ProductType>
        </div>
        <div className='flex items-center'>
          <Price isDiscount={product.offPrice !== 0}>${product.price}</Price>
          {product.offPrice !== 0 && (
            <div className='flex justify-between'>
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

const Card = tw.div`w-[370px]`
const CardImage = tw.img`w-full h-full`
const ProductName = tw.h1`text-primary-black text-text-xl leading-9 font-bold`
const CardContent = tw.div`w-full mt-2.5 gap-y-2.5`
const ProductType = tw.p`text-neutral-dark-grey text-text-lg font-normal leading-7`
const Price = styled.h2<{ isDiscount: boolean }>`
  ${tw`relative font-bold leading-9 text-text-xl`}
  ${({ isDiscount }) =>
    isDiscount
      ? tw`text-neutral-grey before:(absolute top-1/2 left-0 w-full h-0.5 bg-neutral-grey)`
      : tw`text-primary-black`}
`
const DiscountPrice = tw.h3`ml-2.5 font-bold text-primary-black text-text-xl`
const DiscountPercent = tw.p`font-bold text-text-lg text-secondary-red leading-7`

export default ProductCard
