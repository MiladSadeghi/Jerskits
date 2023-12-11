import { cn } from '../../../utils/utils'

type Props = {
  size?: string
  setSize?: setState<string>
}

const sizeFilterItems: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const SizeFilter = ({ size, setSize }: Props) => {
  return (
    <div className='grid w-full grid-cols-3 gap-5'>
      {sizeFilterItems.map((item) => (
        <button
          className={cn(
            'flex items-center justify-center w-full py-4 border border-neutral-soft-grey',
            {
              'border-primary-black': size === item
            }
          )}
          key={item}
          onClick={() => setSize(item)}
        >
          <p className='text-base font-semibold'>{item}</p>
        </button>
      ))}
    </div>
  )
}

export default SizeFilter
