import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = HTMLAttributes<HTMLHeadingElement> & {
  isDiscount?: boolean
}

const ProductPrice = ({
  className = '',
  children,
  isDiscount,
  ...props
}: Props) => {
  return (
    <h3
      className={cn(
        'relative !leading-9 text-2xl font-bold',
        {
          'before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-neutral-grey text-neutral-grey font-semibold !leading-9':
            isDiscount
        },
        className
      )}
      {...props}
    >
      {`$${children}`}
    </h3>
  )
}

export default ProductPrice
