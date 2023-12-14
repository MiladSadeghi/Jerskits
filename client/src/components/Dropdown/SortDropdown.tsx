import { useState } from 'react'
import { ArrowDown } from '../../icons'
import { TSort } from '../../shared/types/Product.types'
import { cn } from '../../utils/utils'
import { useOutsideClick } from '../../hooks/useOutsideClick'

type Props = {
  handleSort: setState<TSort>
}

const sortOptions: Option[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'New Arrivals', value: 'new arrivals' },
  { label: 'Price Low to High', value: 'price:low' },
  { label: 'Price High to Low', value: 'price:high' }
]

const SortDropdown = ({ handleSort }: Props) => {
  const [sort, setSort] = useState<Option>(sortOptions[0])
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const menuRef = useOutsideClick<HTMLDivElement>({
    callback: () => setOpenMenu(false)
  })

  const handleSortChange = (option: Option) => {
    setSort(option)
    setOpenMenu(false)
    handleSort(option)
  }

  return (
    <div className='relative'>
      <div className=''>
        <button
          type='button'
          className='flex items-center font-bold text-right text-primary-black'
          onClick={() => setOpenMenu(true)}
        >
          Sort By
          <ArrowDown
            className='ml-1.5'
            strokeClassName='stroke-primary-black'
          />
        </button>
        <ul
          className={cn(
            'absolute top-[3rem] right-0 bg-white z-[51] border border-primary-black w-64 overflow-clip  rounded-lg shadow-sm',
            {
              'hidden ': !openMenu
            }
          )}
        >
          <div className={'py-2 max-h-56'} ref={menuRef}>
            {sortOptions.map((option) => (
              <li
                key={option.value}
                className={cn(
                  'px-2 py-1.5 text-base cursor-pointer hover:text-white hover:bg-primary-black text-primary-black',
                  {
                    'bg-primary-black text-white': option.value === sort?.value
                  }
                )}
                onClick={() => handleSortChange(option)}
              >
                {option.label}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default SortDropdown
