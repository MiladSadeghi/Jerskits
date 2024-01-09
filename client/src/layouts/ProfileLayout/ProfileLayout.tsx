import { useAppSelector } from '../../App/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ProfileLinks from '../../utils/profile-links'
import { useSignOutMutation } from '../../services'
import { Avatar, ProfileLink } from '../../components'
import { ArrowDown } from '../../icons'
import { useRef } from 'react'

function ProfileLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const profile = useAppSelector((state) => state.profile)
  const profileRef = useRef<HTMLDivElement>(null)
  const [signOut] = useSignOutMutation()

  if (!isAuthenticated)
    return <Navigate to='/' state={{ from: location }} replace />

  return (
    <div className='container mx-auto my-24 xl:max-w-5xl'>
      <div className='flex justify-between'>
        <div className='w-[350px] hidden md:block'>
          <div className='space-y-7'>
            <div className='flex items-center'>
              <Avatar avatarSizes={[56, 56]} />
              <h1 className='ml-5 font-bold capitalize text-primary-black text-text-xl'>
                Hi, {profile.fullName}
              </h1>
            </div>
            <div className='space-y-7'>
              {ProfileLinks.map((link, index) => (
                <ProfileLink {...link} key={index} />
              ))}
            </div>
            <button
              className='flex justify-between duration-100 ease-in-out font-bold text-lg leading-[150%] text-primary-black w-full'
              onClick={() => signOut()}
            >
              Logout{' '}
              <ArrowDown
                className='-rotate-90 opacity-30'
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>
        <div className='w-full md:max-w-[400px]' ref={profileRef}>
          <Outlet context={profileRef} />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
