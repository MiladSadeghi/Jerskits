import tw, { styled } from 'twin.macro'
import { TType } from '../../../shared/types/Product.types'

type Props = {
  type?: TType
  setType?: setState<TType>
}

const typeFilterItems: string[] = ['football', 'basketball']

const TypeFilter = ({ type, setType }: Props) => {
  return (
    <div className='grid w-full grid-cols-2 gap-5'>
      {typeFilterItems.map((item) => (
        <TypeBtn
          key={item}
          $isActive={type === item}
          onClick={() => setType(item)}
        >
          <TypeLabel>{item} Shirt</TypeLabel>
        </TypeBtn>
      ))}
    </div>
  )
}

const TypeBtn = styled.button<{
  $isActive: boolean
}>`
  ${tw`flex items-center justify-center w-full py-4 border `}
  ${({ $isActive }) =>
    $isActive ? tw`border-primary-black` : tw`border-neutral-soft-grey`}
`
const TypeLabel = tw.p`
  text-base font-semibold
`

export default TypeFilter
