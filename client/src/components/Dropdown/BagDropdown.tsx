import { useState, useRef } from 'react'
import { ArrowDown } from '../../icons'
import { cn } from '../../utils/utils'
import { useOutsideClick } from '../../hooks/useOutsideClick'

type Props = {
  optionsValue: string[]
  label: string
  currentValue: Option
  isDisabled: boolean
  productId: string
  handleUpdate: (value: string, productId: string) => void
  menuPosition: 'left' | 'right'
}

const transformOptions = (values: string[], label: string): Option[] => {
  const option = values.map((value) => ({
    label: `${label} : ${value}`,
    value
  }))
  return option
}

const BagDropdown = ({
  optionsValue,
  currentValue,
  handleUpdate,
  label,
  menuPosition,
  isDisabled,
  productId
}: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<Option>(currentValue)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useOutsideClick<HTMLDivElement, HTMLButtonElement>({
    callback: () => setOpenMenu(false),
    triggerRef: btnRef
  })
  const options = transformOptions(optionsValue, label)
  const handleOpenMenu = () => {
    if (isDisabled) return
    setOpenMenu(true)
  }

  const handleUpdateValue = (option: Option) => {
    handleUpdate(option.value, productId)
    setSelectedOption(option)
    setOpenMenu(false)
  }

  return (
    <div className='relative w-full'>
      <button
        ref={btnRef}
        onClick={handleOpenMenu}
        className={cn(
          'relative flex items-center justify-between border border-neutral-soft-grey focus:border-primary-black h-[60px] px-6 py-3 w-full transition-all duration-60',
          {
            'cursor-not-allowed after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-neutral-soft-grey/70':
              isDisabled
          }
        )}
      >
        <span className='font-bold text-primary-black'>
          {currentValue.label}
        </span>
        <ArrowDown />
      </button>
      <ul
        className={cn(
          'absolute top-[4.3rem] bg-white z-[51] border border-primary-black w-64 overflow-clip rounded-lg shadow-sm',
          {
            'hidden ': !openMenu,
            'right-0': menuPosition === 'right',
            'left-0': menuPosition === 'left'
          }
        )}
      >
        <div className={'py-2 max-h-56 overflow-y-auto'} ref={menuRef}>
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                'px-2 py-1.5 text-base cursor-pointer hover:text-white hover:bg-primary-black text-primary-black',
                {
                  'bg-primary-black text-white':
                    option.value === selectedOption?.value
                }
              )}
              onClick={() => handleUpdateValue(option)}
            >
              {option.label}
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}

export default BagDropdown
