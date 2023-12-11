import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = HTMLAttributes<HTMLParagraphElement>

const ProductDiscountPercent = ({ className, children, ...props }: Props) => {
  return (
    <p
      className={cn(
        'font-bold text-text-lg text-secondary-red leading-7',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export default ProductDiscountPercent
