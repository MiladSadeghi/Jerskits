import { TBrand } from '../../../shared/types/Product.types'

type Props = {
  brand?: TBrand
  setBrand?: setState<TBrand>
}

const BrandFilter = ({ brand, setBrand }: Props) => {
  return <div>BrandFilter</div>
}

export default BrandFilter
