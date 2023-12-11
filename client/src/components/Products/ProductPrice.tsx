import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = HTMLAttributes<HTMLHeadingElement> & {
  isDiscount?: boolean
}

const ProductPrice = ({ className, children, isDiscount, ...props }: Props) => {
  return (
    <h3
      className={cn('relative font-bold leading-9 text-text-xl', className, {
        'before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-neutral-grey':
          isDiscount
      })}
      {...props}
    >
      {children}
    </h3>
  )
}

export default ProductPrice
