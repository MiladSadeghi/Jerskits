import { Link } from 'react-router-dom'
import { forwardRef } from 'react'
import ProfileLinks from '../../utils/profile-links'
import { useSignOutMutation } from '../../services'
import { useAppSelector } from '../../App/hooks'
import { Close } from '../../icons'
import { cn } from '../../utils/utils'
import { Avatar } from '..'

type Props = {
  isOpen: boolean
  closePopup: () => void
}

const ProfilePopup = forwardRef<HTMLDialogElement, Props>(
  ({ isOpen, closePopup }, ref) => {
    const [signOut] = useSignOutMutation()
    const profile = useAppSelector((state) => state.profile)

    return (
      <dialog
        open={true}
        className={cn(
          'fixed md:absolute z-[800] md:z-20 right-0 md:top-[82px] md:bottom-[unset] bg-white shadow-md w-full md:w-80 p-7 space-y-7 border border-neutral-soft-grey -bottom-full md:hidden duration-1000',
          { 'bottom-0 md:block duration-500': isOpen }
        )}
        style={{ insetInlineStart: 'unset' }}
        ref={ref}
        data-testid='profile-popup'
      >
        <div className='flex items-center justify-between md:hidden'>
          <h1 className='text-lg font-bold text-primary-black'>Account</h1>
          <button onClick={closePopup}>
            <Close />
          </button>
        </div>
        <header className='flex items-center'>
          <Avatar avatarSizes={[56, 56]} />
          <h1 className='ml-5 font-bold capitalize text-primary-black text-text-xl'>
            Hi, {profile.firstName ? profile.firstName : profile.fullName}
          </h1>
        </header>
        <main className='flex flex-col space-y-7'>
          {ProfileLinks.map((link, index) => (
            <Link
              className='font-bold text-lg leading-[150%] text-primary-black'
              to={link.link}
              key={index}
            >
              {link.title}
            </Link>
          ))}
          <button
            className='font-bold text-lg leading-[150%] text-primary-black text-left'
            onClick={() => signOut()}
          >
            Logout
          </button>
        </main>
      </dialog>
    )
  }
)

export default ProfilePopup
