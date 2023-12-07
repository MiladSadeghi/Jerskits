import { Link } from 'react-router-dom'
import { forwardRef } from 'react'
import ProfileLinks from '../../utils/profile-links'
import { useSignOutMutation } from '../../services'
import { useAppSelector } from '../../App/hooks'
import { Close } from '../../icons'

type Props = {
  isOpen: boolean
  handlePopup: (arg: keyof TPopups) => void
}

const ProfilePopup = forwardRef<HTMLDialogElement, Props>(
  ({ isOpen, handlePopup }, ref) => {
    const [signOut] = useSignOutMutation()
    const profile = useAppSelector((state) => state.profile)
    const userAvatar = profile.avatar

    return (
      <dialog
        open={true}
        className={`fixed md:absolute z-[800] md:z-20 right-0 md:top-[82px] md:bottom-[unset] bg-white shadow-md w-full md:w-80 p-7 space-y-7 border border-neutral-soft-grey ${
          isOpen
            ? 'bottom-0 md:block duration-500'
            : '-bottom-full md:hidden duration-1000'
        }`}
        css='inset-inline-start: unset;'
        ref={ref}
        data-testid='profile-popup'
      >
        <div className='flex items-center justify-between md:hidden'>
          <h1 className='text-lg font-bold text-primary-black'>Account</h1>
          <button onClick={() => handlePopup('profile')}>
            <Close />
          </button>
        </div>
        <header className='flex items-center'>
          <div className='flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full'>
            {userAvatar !== '' ? (
              <img
                className='object-cover w-full h-full rounded-full'
                crossOrigin='anonymous'
                alt='user-avatar'
                src={`${import.meta.env.VITE_SERVER_URL.replace(
                  '/api',
                  ''
                )}/images/${userAvatar}`}
              />
            ) : (
              <div className='bg-[#e4e6e7] rounded-full w-[100px] h-[100px]'>
                <img
                  src='/images/blank-profile-picture.png'
                  className='object-cover w-full h-full p-4 rounded-full'
                  alt='user-avatar'
                />
              </div>
            )}
          </div>
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
