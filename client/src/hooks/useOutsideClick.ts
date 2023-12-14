import { RefObject, useEffect, useRef } from 'react'

type Props<P extends HTMLElement> = {
  callback: () => void
  triggerRef?: RefObject<P>
}

export const useOutsideClick = <
  T extends HTMLElement,
  P extends HTMLElement = HTMLElement
>({
  callback,
  triggerRef
}: Props<P>) => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!triggerRef ||
          !triggerRef.current ||
          !triggerRef.current.contains(event.target as Node))
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  return ref
}
