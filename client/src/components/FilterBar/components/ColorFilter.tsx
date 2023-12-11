import { cn } from '../../../utils/utils'

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
        <button
          className={cn(
            'flex items-center justify-center w-full py-4 border border-neutral-soft-grey',
            { 'border-primary-black': color === item }
          )}
          key={item}
          onClick={() => setColor(item)}
        >
          <span
            className='w-5 h-5 border rounded-full border-neutral-soft-grey'
            style={{ background: item }}
          />
          <p className='text-base italic font-semibold ml-2.5'>{item}</p>
        </button>
      ))}
    </div>
  )
}

export default ColorFilter
