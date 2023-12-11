import { ImgHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

type Props = ImgHTMLAttributes<HTMLImageElement>

const ProfileImage = ({ className, ...props }: Props) => {
  return (
    <img
      className={cn('rounded-full object-cover w-full h-full', className)}
      {...props}
    />
  )
}

export default ProfileImage
