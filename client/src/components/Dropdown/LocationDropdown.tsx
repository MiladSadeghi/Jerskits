import { Control, useController } from 'react-hook-form'
import { TProfileSchema } from '../../pages/Profile/Edit/Schema'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetLocationQuery } from '../../services'
import { ArrowDown } from '../../icons'
import { cn } from '../../utils/utils'
import { useOutsideClick } from '../../hooks/useOutsideClick'

type Props = {
  control: Control<TProfileSchema>
  name: 'country' | 'state' | 'city'
  menuPosition: 'right' | 'left'
  defaultLocation?: Option
}

const LocationDropdown = ({
  control,
  name,
  menuPosition,
  defaultLocation
}: Props) => {
  const { field } = useController({
    control,
    name
  })

  const [getLocation, { data }] = useLazyGetLocationQuery()
  const [options, setOptions] = useState<Option[]>()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useOutsideClick<HTMLDivElement, HTMLInputElement>({
    callback: () => setOpenMenu(false),
    triggerRef: inputRef
  })

  useEffect(() => {
    if (data) {
      setOptions(data?.[name])
    }
  }, [data])

  useEffect(() => {
    if (inputRef.current && defaultLocation) {
      inputRef.current.value = defaultLocation?.label
    }
  }, [defaultLocation])

  useEffect(() => {
    if (inputRef.current && !field?.value?.length) {
      inputRef.current.value = ''
    }
  }, [field.value])

  useEffect(() => {
    if (name === 'country') {
      getLocation('/location')
    }
  }, [])

  useEffect(() => {
    if (name === 'state' && control._formValues.country) {
      getLocation(`/location/${control._formValues.country}`)
    }
  }, [control._formValues.country])

  useEffect(() => {
    if (
      name === 'city' &&
      control._formValues.country &&
      control._formValues.state
    ) {
      getLocation(
        `/location/${control._formValues.country}/${control._formValues.state}`
      )
    }
  }, [control._formValues.state])

  const openMenuHandler = useCallback(() => {
    setOpenMenu(true)
    inputRef.current?.focus()
  }, [openMenu])

  const handleUpdateValue = (option: Option) => {
    if (inputRef.current) {
      inputRef.current.value = option.label
    }
    field.onChange(option.value)
    setOpenMenu(false)
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setOptions(data?.[name])
    } else {
      setOptions(
        data?.[name]?.filter((option) =>
          option.label.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
    }
  }

  return (
    <div className='relative'>
      <div
        className='relative flex items-center w-full h-12'
        onClick={openMenuHandler}
      >
        <input
          type='text'
          id={`${name}-dropdown`}
          className={cn(
            'w-full h-full px-6 py-0 m-0 border cursor-default ring-0 outline-none border-neutral-grey focus:outline-none focus:ring-0 focus-within:border-primary-black ',
            { 'border-primary-black focus:border-primary-black': openMenu }
          )}
          onChange={handleSearchInput}
          ref={inputRef}
        />
        <ArrowDown className='absolute right-3' />
      </div>
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
          {options ? (
            options.map((option) => (
              <li
                key={option.value}
                className={cn(
                  'px-2 py-1.5 text-base cursor-pointer hover:text-white hover:bg-primary-black text-primary-black',
                  {
                    'bg-primary-black text-white': option.value === field?.value
                  }
                )}
                onClick={() => handleUpdateValue(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <p>Cant find any {name}</p>
          )}
        </div>
      </ul>
    </div>
  )
}

export default LocationDropdown
