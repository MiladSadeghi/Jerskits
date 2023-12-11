import { ParamHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = ParamHTMLAttributes<HTMLParagraphElement>

const FormError = ({ className, children, ...props }: Props) => {
  return (
    <p className={cn('text-red-600 text-sm', className)} {...props}>
      {children}
    </p>
  )
}

export default FormError
