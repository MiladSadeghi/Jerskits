import { TType } from '../../../shared/types/Product.types'

type Props = {
  type?: TType
  setType?: setState<TType>
}

const TypeFilter = ({ type, setType }: Props) => {
  return <div>TypeFilter</div>
}

export default TypeFilter
