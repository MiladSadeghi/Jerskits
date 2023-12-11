import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = HTMLAttributes<HTMLHeadingElement>

const ProductDiscountPrice = ({ className, children, ...props }: Props) => {
  return (
    <h3
      className={cn(
        'ml-2.5 font-bold text-primary-black text-text-xl',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export default ProductDiscountPrice
