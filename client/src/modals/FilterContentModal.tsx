import { ReactNode, RefObject } from 'react'
import { Refresh } from '../icons'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { cn } from '../utils/utils'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  btnRef: RefObject<HTMLButtonElement>
  width?: string
  title?: string
  applyHandler: () => void
  resetFilter?: () => void
  filterButtonLabel?: string[]
  setActiveFilter?: (arg0: number) => void
  activeFilter?: number
}

const FilterContentModal = ({
  open,
  onClose,
  children,
  btnRef,
  width,
  title,
  applyHandler,
  resetFilter,
  filterButtonLabel,
  activeFilter,
  setActiveFilter
}: Props) => {
  const ref = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: onClose,
    triggerRef: btnRef
  })
  const isLarge = useMediaQuery('only screen and (min-width: 768px)')

  return (
    <>
      <div
        className={cn(
          'fixed bottom-0 left-0 w-full h-screen bg-primary-black transition-all duration-200 lg:hidden opacity-40 z-10 block',
          { hidden: !open }
        )}
      />
      <dialog
        open={true}
        ref={ref}
        className={cn(
          ' bg-white p-[30px] left-0 border bottom-0 border-neutral-soft-grey m-0 z-[51] fixed h-[465px] transition-all duration-300 ease-linear lg:top-[calc(100%+45px)] lg:absolute lg:h-fit',
          { '-bottom-full lg:bottom-[unset]': !open }
        )}
        style={{ width: width }}
      >
        {isLarge ? (
          <h1 className='font-bold text-lg text-primary-black leading-7 mb-[30px]'>
            {title}
          </h1>
        ) : (
          <div className='flex items-center pt-2 pb-4 overflow-x-hidden gap-x-7 mb-7'>
            {filterButtonLabel?.map((label, idx) => (
              <button
                className={cn(
                  'flex items-center w-fit font-bold text-lg leading-[27px] text-primary-black pb-5 relative whitespace-pre',
                  {
                    'after:absolute after:bottom-2.5 after:w-full after:h-0.5 after:bg-primary-black':
                      activeFilter === idx
                  }
                )}
                key={idx}
                onClick={() => setActiveFilter?.(idx)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {children}
        <div className='grid grid-cols-3 gap-x-5 mt-[30px]'>
          <button
            className='w-full text-white bg-primary-black text-base font-bold text-center col-span-2 py-[18px]'
            onClick={() => applyHandler()}
            aria-label='apply filter'
          >
            APPLY
          </button>
          <button
            className='flex items-center justify-center w-full bg-primary-black'
            onClick={() => resetFilter?.()}
            aria-label='reset filter'
          >
            <Refresh />
          </button>
        </div>
      </dialog>
    </>
  )
}

export default FilterContentModal
