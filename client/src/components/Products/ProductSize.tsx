import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean
}

const ProductSize = ({ className, children, active, ...props }: Props) => {
  return (
    <button
      className={cn(
        'w-full py-4 border border-neutral-soft-grey h-14',
        className,
        { 'border-primary-black': active }
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default ProductSize
