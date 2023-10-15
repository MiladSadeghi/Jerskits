import { Price } from '../../../shared/types/Product.types'

type Props = {
  price?: Price
  setPrice?: setState<Price> | undefined
}

const PriceFilter = ({ price, setPrice }: Props) => {
  return <div></div>
}

export default PriceFilter
