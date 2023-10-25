import tw, { styled } from 'twin.macro'

type Props = {
  size?: string
  setSize?: setState<string>
}

const sizeFilterItems: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const SizeFilter = ({ size, setSize }: Props) => {
  return (
    <div className='grid w-full grid-cols-3 gap-5'>
      {sizeFilterItems.map((item) => (
        <SizeBtn
          key={item}
          $isActive={size === item}
          onClick={() => setSize(item)}
        >
          <SizeLabel>{item}</SizeLabel>
        </SizeBtn>
      ))}
    </div>
  )
}

const SizeBtn = styled.button<{
  $isActive: boolean
}>`
  ${tw`flex items-center justify-center w-full py-4 border `}
  ${({ $isActive }) =>
    $isActive ? tw`border-primary-black` : tw`border-neutral-soft-grey`}
`
const SizeLabel = tw.p`
  text-base font-semibold
`

export default SizeFilter
