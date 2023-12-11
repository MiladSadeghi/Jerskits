import { LabelHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = LabelHTMLAttributes<HTMLLabelElement>

const FormLabel = ({ className, children, ...props }: Props) => {
  return (
    <label
      className={cn('font-medium text-primary-black text-text-sm', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default FormLabel
