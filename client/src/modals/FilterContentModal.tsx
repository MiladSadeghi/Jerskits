import { ReactNode, RefObject, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { Refresh } from '../icons'
import { useMediaQuery } from '../hooks/useMediaQuery'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  btnRef: RefObject<HTMLButtonElement>
  width?: string
  title?: string
  applyHandler: () => void
  resetFilter: () => void
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
  const ref = useRef<HTMLDialogElement | null>(null)
  const isLarge = useMediaQuery('only screen and (min-width: 768px)')

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        ref.current &&
        btnRef.current &&
        !ref.current.contains(event.target as Node) &&
        !btnRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open, onClose])

  return (
    (isLarge ? open : true) && (
      <>
        <div
          className={`fixed bottom-0 left-0 w-full h-screen bg-primary-black transition-all duration-200 lg:hidden ${
            open ? 'opacity-40 z-10' : 'opacity-0 -z-10'
          }`}
        />
        <Modal open ref={ref} width={width ?? '100%'} $isOpen={open}>
          {isLarge ? (
            <ModalTitle>{title}</ModalTitle>
          ) : (
            <div className='flex items-center pt-2 pb-4 overflow-x-hidden gap-x-7 mb-7'>
              {filterButtonLabel?.map((label, idx) => (
                <Button
                  key={idx}
                  $isActive={activeFilter === idx}
                  onClick={() => setActiveFilter?.(idx)}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}

          {children}
          <div className='grid grid-cols-3 gap-x-5 mt-[30px]'>
            <ModalApplyBtn
              onClick={() => applyHandler()}
              aria-label='apply filter'
            >
              APPLY
            </ModalApplyBtn>
            <ModalResetBtn
              onClick={() => resetFilter()}
              aria-label='reset filter'
            >
              <Refresh />
            </ModalResetBtn>
          </div>
        </Modal>
      </>
    )
  )
}

const Modal = styled.dialog<{ width: string; $isOpen: boolean }>`
  ${tw`flex flex-col justify-between bg-white p-[30px] left-0 border border-neutral-soft-grey m-0 z-20 bottom-0 fixed h-[465px] transition-all duration-300 ease-linear lg:(top-[calc(100%+45px)] absolute h-fit)`}
  ${({ $isOpen }) => ($isOpen ? tw`bottom-0` : tw`-bottom-full`)}
  width: ${({ width }) => width};
`
const ModalTitle = tw.h1`font-bold text-lg text-primary-black leading-7 mb-[30px]`
const ModalApplyBtn = tw.button`w-full text-white bg-primary-black text-base font-bold text-center col-span-2 py-[18px]`
const ModalResetBtn = tw.button`bg-primary-black w-full flex items-center justify-center`

const Button = styled.button<{
  $isActive: boolean
}>`
  ${tw`flex items-center w-fit font-bold text-lg leading-[27px] text-primary-black pb-5 relative whitespace-pre`}
  ${({ $isActive }) =>
    $isActive
      ? tw`after:(absolute bottom-0 w-full h-0.5 bg-primary-black )`
      : ''}
`

export default FilterContentModal
