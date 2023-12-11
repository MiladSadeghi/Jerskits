import { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'
import './style.css'

type Props = InputHTMLAttributes<HTMLInputElement>

const FormInput = ({ className, disabled, style, ...props }: Props) => {
  return (
    <input
      className={cn(
        'w-full h-12 px-5 py-4 border outline-none border-neutral-grey input',
        className,
        {
          'bg-[#f2f2f2]': disabled
        }
      )}
      style={{
        ...style
      }}
      {...props}
    />
  )
}

export default FormInput
