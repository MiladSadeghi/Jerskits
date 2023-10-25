import tw, { styled } from 'twin.macro'
import { TBrand } from '../../../shared/types/Product.types'
import provideBrandLogo from '../../../utils/brand-logo'

type Props = {
  brand?: TBrand
  setBrand?: setState<TBrand>
}

const sizeFilterItems: TBrand[] = ['nike', 'adidas', 'jordan', 'puma']

const BrandFilter = ({ brand, setBrand }: Props) => {
  return (
    <div className='grid w-full grid-cols-3 gap-5'>
      {sizeFilterItems.map((item) => (
        <BrandBtn
          key={item}
          $isActive={brand === item}
          onClick={() => setBrand(item)}
        >
          <BrandLogo src={provideBrandLogo(item)} />
          <ColorName>{item}</ColorName>
        </BrandBtn>
      ))}
    </div>
  )
}

const BrandBtn = styled.button<{
  $isActive: boolean
}>`
  ${tw`flex items-center justify-center w-full py-4 border `}
  ${({ $isActive }) =>
    $isActive ? tw`border-primary-black` : tw`border-neutral-soft-grey`}
`
const BrandLogo = tw.img`w-5 h-5`
const ColorName = tw.p`
  text-base font-semibold ml-2.5
`

export default BrandFilter
