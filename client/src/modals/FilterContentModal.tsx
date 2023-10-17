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
}

const FilterContentModal = ({
  open,
  onClose,
  children,
  btnRef,
  width,
  title,
  applyHandler
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
      <ModalApplyBtn onClick={applyHandler}>APPLY</ModalApplyBtn>
    </Modal>
  ) : null
}

const Modal = styled.dialog<{ width: number }>`
  ${tw`bg-white p-[30px] absolute left-0 top-[calc(100%+45px)] border border-neutral-soft-grey m-0 z-10`}
  width: ${({ width }) => `${width}px`};
`
const ModalTitle = tw.h1`font-bold text-lg text-primary-black leading-7 mb-[30px]`
const ModalApplyBtn = tw.button`w-full text-white bg-primary-black text-base font-bold leading-6 py-[18px] text-center mt-[30px]`

export default FilterContentModal
