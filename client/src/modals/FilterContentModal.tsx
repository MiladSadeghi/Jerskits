import { ReactNode, RefObject, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  btnRef: RefObject<HTMLButtonElement>
  width: number
  title: string
  applyHandler: () => void
  resetFilter: () => void
}

const FilterContentModal = ({
  open,
  onClose,
  children,
  btnRef,
  width,
  title,
  applyHandler,
  resetFilter
}: Props) => {
  const ref = useRef<HTMLDialogElement | null>(null)
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

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open, onClose])

  return open ? (
    <Modal open ref={ref} width={width}>
      <ModalTitle>{title}</ModalTitle>
      {children}
      <div className='grid grid-cols-3 gap-x-5 mt-[30px]'>
        <ModalApplyBtn onClick={applyHandler} aria-label='apply filter'>
          APPLY
        </ModalApplyBtn>
        <ModalResetBtn onClick={() => resetFilter()} aria-label='reset filter'>
          <svg
            width='30px'
            height='30px'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g
              fill='none'
              fillRule='evenodd'
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              transform='matrix(0 1 1 0 2.5 2.5)'
            >
              <path d='m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8' />

              <path d='m4 1v4h-4' transform='matrix(1 0 0 -1 0 6)' />
            </g>
          </svg>
        </ModalResetBtn>
      </div>
    </Modal>
  ) : null
}

const Modal = styled.dialog<{ width: number }>`
  ${tw`bg-white p-[30px] absolute left-0 top-[calc(100%+45px)] border border-neutral-soft-grey m-0 z-10`}
  width: ${({ width }) => `${width}px`};
`
const ModalTitle = tw.h1`font-bold text-lg text-primary-black leading-7 mb-[30px]`
const ModalApplyBtn = tw.button`w-full text-white bg-primary-black text-base font-bold text-center col-span-2 py-[18px]`
const ModalResetBtn = tw.button`bg-primary-black w-full flex items-center justify-center`

export default FilterContentModal
