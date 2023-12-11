import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'
import './style.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center w-full font-bold text-white h-[60px] bg-primary-black button',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
