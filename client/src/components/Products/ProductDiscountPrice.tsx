import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = HTMLAttributes<HTMLHeadingElement>

const ProductDiscountPrice = ({ className, children, ...props }: Props) => {
  return (
    <h3
      className={cn(
        'font-bold text-primary-black text-2xl leading-9',
        className
      )}
      {...props}
    >
      {`$${children}`}
    </h3>
  )
}

export default ProductDiscountPrice
