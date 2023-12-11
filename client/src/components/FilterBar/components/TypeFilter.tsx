import { TType } from '../../../shared/types/Product.types'
import { cn } from '../../../utils/utils'

type Props = {
  type?: TType
  setType?: setState<TType>
}

const typeFilterItems: string[] = ['football', 'basketball']

const TypeFilter = ({ type, setType }: Props) => {
  return (
    <div className='grid w-full grid-cols-2 gap-5'>
      {typeFilterItems.map((item) => (
        <button
          className={cn(
            'flex items-center justify-center w-full py-4 border border-neutral-soft-grey',
            {
              'border-primary-black': type === item
            }
          )}
          key={item}
          onClick={() => setType(item)}
        >
          <p className='text-base font-semibold'>{item} Shirt</p>
        </button>
      ))}
    </div>
  )
}

export default TypeFilter
