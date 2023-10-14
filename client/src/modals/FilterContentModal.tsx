import { ReactNode, RefObject, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  btnRef: RefObject<HTMLButtonElement>
  width: number
}

const FilterContentModal = ({
  open,
  onClose,
  children,
  btnRef,
  width
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
      <div>{children}</div>
    </Modal>
  ) : null
}

const Modal = styled.dialog<{ width: number }>`
  ${tw`bg-white p-[30px] absolute left-0 top-[calc(100%+45px)] border border-neutral-soft-grey m-0 z-10`}
  width: ${({ width }) => `${width}px`};
`

export default FilterContentModal
