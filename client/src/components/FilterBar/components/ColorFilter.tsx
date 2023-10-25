import tw, { styled } from 'twin.macro'

type Props = {
  color?: string
  setColor?: setState<string>
}

const colorFilterItems: string[] = [
  'Black',
  'White',
  'Red',
  'Yellow',
  'Grey',
  'Blue'
]

const ColorFilter = ({ color, setColor }: Props) => {
  return (
    <div className='grid w-full grid-cols-3 gap-5'>
      {colorFilterItems.map((item) => (
        <ColorBtn
          key={item}
          $isActive={color === item}
          onClick={() => setColor(item)}
        >
          <ColorIndicator style={{ background: item }} />
          <ColorName>{item}</ColorName>
        </ColorBtn>
      ))}
    </div>
  )
}

const ColorBtn = styled.button<{
  $isActive: boolean
}>`
  ${tw`flex items-center justify-center w-full py-4 border `}
  ${({ $isActive }) =>
    $isActive ? tw`border-primary-black` : tw`border-neutral-soft-grey`}
`
const ColorIndicator = tw.span`w-5 h-5 rounded-full border border-neutral-soft-grey`
const ColorName = tw.p`
  text-base italic font-semibold ml-2.5
`

export default ColorFilter
