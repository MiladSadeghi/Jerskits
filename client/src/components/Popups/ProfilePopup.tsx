import tw, { styled } from 'twin.macro'
import { Link as RouterLink } from 'react-router-dom'
import { forwardRef } from 'react'
import ProfileLinks from '../../utils/profile-links'
import { useSignOutMutation } from '../../services'
import { useAppSelector } from '../../App/hooks'

type Props = {
  isShow: boolean
}

const ProfilePopup = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { isShow } = props
  const [signOut] = useSignOutMutation()
  const profile = useAppSelector((state) => state.profile)
  const userAvatar = profile.avatar

  return (
    <Wrapper $isShow={isShow} ref={ref}>
      <header className='flex items-center'>
        <div className='flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full'>
          {userAvatar !== '' ? (
            <img
              className='object-cover w-full h-full rounded-full'
              crossOrigin='anonymous'
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
          <Link to={link.link} key={index}>
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
    </Wrapper>
  )
})

const Wrapper = styled.div<{ $isShow?: boolean }>`
  ${tw`absolute z-20 right-0 top-[82px] bg-white shadow-md w-80 p-7 space-y-7 border border-neutral-soft-grey`}
  ${({ $isShow }) => ($isShow ? tw`block` : tw`hidden`)}
`
const Link = tw(RouterLink)`
	font-bold text-lg leading-[150%] text-primary-black
`

export default ProfilePopup
