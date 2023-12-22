import { HTMLAttributes } from 'react'
import { cn } from '../../utils/utils'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'

type Props = HTMLAttributes<HTMLDivElement> & {
  avatarSizes: [number, number]
}

const Avatar = ({ avatarSizes, className, ...props }: Props) => {
  const [width, height] = avatarSizes
  const avatar = useAppSelector((state: RootState) => state.profile.avatar)

  return (
    <div
      className={cn('flex items-center justify-center rounded-full', className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...props}
    >
      {avatar ? (
        <img
          className='object-contain w-full h-full rounded-full'
          crossOrigin='anonymous'
          alt='user-avatar'
          src={`${import.meta.env.VITE_SERVER_URL.replace(
            '/api',
            ''
          )}/images/${avatar}`}
        />
      ) : (
        <div className='bg-[#e4e6e7] rounded-full'>
          <img
            src='/images/blank-profile-picture.png'
            className='object-contain w-full h-full p-2 rounded-full'
            alt='user-avatar'
          />
        </div>
      )}
    </div>
  )
}

export default Avatar
