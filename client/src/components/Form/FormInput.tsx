import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/utils'
import './style.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  ref: ForwardedRef<HTMLInputElement>
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, style, ...props }: Props, ref) => {
    return (
      <input
        className={cn(
          'w-full h-12 px-5 py-4 focus:ring-0 focus:shadow-none focus:outline-none border outline-none border-neutral-grey form-input',
          className,
          {
            'bg-[#f2f2f2]': disabled
          }
        )}
        style={{
          ...style
        }}
        {...props}
        ref={ref}
      />
    )
  }
)

export default FormInput
