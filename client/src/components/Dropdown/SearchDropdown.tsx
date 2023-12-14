import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown } from '../../icons'
import { cn } from '../../utils/utils'
import styles from './Dropdown.module.css'
import { useOutsideClick } from '../../hooks/useOutsideClick'

type Props = HTMLAttributes<HTMLDivElement> & {
  searchable: boolean
  options?: Option[]
  disabled?: boolean
  optionsLocation?: string
  selectedLocation?: Option
  handleLocation: setState<Option>
}

const SearchDropdown = ({
  searchable,
  options,
  optionsLocation,
  selectedLocation,
  handleLocation,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const optionsRef = useRef<HTMLDivElement>(null)
  const [searchOptions, setSearchOption] = useState<Option[] | undefined>(
    options
  )
  const containerRef = useOutsideClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
    triggerRef: optionsRef
  })

  useEffect(() => {
    setSearchValue(selectedLocation?.label ?? '')
  }, [selectedLocation])

  const searchedOptions = useCallback(() => {
    if (searchValue !== '' && searchValue !== selectedLocation?.label) {
      const filterOptions = options?.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
      setSearchOption(filterOptions)
    } else {
      setSearchOption(options)
    }
  }, [searchValue, isOpen])

  const handleSetSearchInput = (inputValue: string) => {
    setSearchValue(inputValue)
    searchedOptions()
  }

  const handleSetLocation = (location: Option) => {
    handleLocation(location)
    setIsOpen(false)
  }

  return (
    <div className='relative w-full' {...props}>
      <div
        className={cn(
          'flex items-center justify-between w-full h-12 border border-neutral-grey focus:border-primary-black'
        )}
        ref={containerRef}
        onClick={() => setIsOpen(true)}
        tabIndex={0}
      >
        {isOpen ? (
          <input
            disabled={!searchable}
            type='text'
            value={searchValue}
            onChange={(e) => handleSetSearchInput(e.target.value)}
            className='w-[80%] px-5 border-none ring-0 focus:outline-none focus:ring-0 cursor-default text-sm whitespace-nowrap'
          />
        ) : (
          <p className='w-[80%] px-5 border-none ring-0 focus:outline-none focus:ring-0 cursor-default text-sm whitespace-nowrap'>
            {selectedLocation?.label}
          </p>
        )}

        <ArrowDown className='w-[20%]' />
      </div>

      <ul
        className={cn(
          'absolute top-[4rem] bg-white z-20  border border-primary-black w-64 overflow-clip  rounded-xl shadow-sm',
          {
            'hidden ': !isOpen,
            'left-0': optionsLocation === 'left',
            'right-0': optionsLocation === 'right'
          }
        )}
      >
        <div
          className={cn('py-1 overflow-y-scroll max-h-56', styles['drop-down'])}
          ref={optionsRef}
        >
          {!searchOptions || searchOptions.length === 0 ? (
            <p className='py-2 text-center'>No location</p>
          ) : (
            searchOptions?.map((option) => (
              <li
                key={option.value}
                className={cn(
                  'px-2 py-1 text-base cursor-pointer hover:text-white hover:bg-primary-black text-primary-black',
                  {
                    'bg-primary-black text-white':
                      option.value === selectedLocation?.value
                  }
                )}
                onClick={() => handleSetLocation(option)}
              >
                {option.label}
              </li>
            ))
          )}
        </div>
      </ul>
    </div>
  )
}
export default SearchDropdown
