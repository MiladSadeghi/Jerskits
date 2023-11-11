import tw from 'twin.macro'
import { Link, useLocation } from 'react-router-dom'
import styled from 'twin.macro'
import { useState, useRef, useEffect } from 'react'
import { ProfilePopup } from '..'
import { useAppSelector } from '../../App/hooks'
import { Bag, Heart, MagnifySearch } from '../../icons'

type TPopups = {
  profile: boolean
}

function Navbar() {
  const [popups, setPopups] = useState<TPopups>({
    profile: false
  })
  const profileRef = useRef<HTMLDivElement | null>(null)
  const profileButtonRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const authStatus = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.profile)

  const handlePopupOpen = () => {
    setPopups({
      profile: true
    })
  }

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const isProfileClicked = profileRef.current?.contains(event.target as Node)
    const isProfileButtonClicked = profileButtonRef.current?.contains(
      event.target as Node
    )

    if (!isProfileClicked && !isProfileButtonClicked) {
      setPopups((prevPopups) => ({
        ...prevPopups,
        profile: false
      }))
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) =>
      handleClickOutside(event)

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  useEffect(() => {
    setPopups({
      profile: false
    })
  }, [location])

  return (
    <Wrapper>
      <div className='flex items-center justify-between w-full h-full'>
        <div>
          <Link to='/'>
            <img src={'/images/jerskits-black.jpg'} alt='Home' />
          </Link>
        </div>
        <div className='flex gap-10'>
          <NavLink to='/men'>Men</NavLink>
          <NavLink to='/women'>Women</NavLink>
          <NavLink to='/kid'>Kids</NavLink>
        </div>
        <div className='flex items-center gap-10'>
          <button aria-label='search'>
            <MagnifySearch />
          </button>
          <button aria-label='bag'>
            <Bag />
          </button>
          <button aria-label='favorite'>
            <Heart />
          </button>
          {authStatus ? (
            <button ref={profileButtonRef} onClick={handlePopupOpen}>
              <img
                crossOrigin='anonymous'
                src={
                  (profile.avatar as string)
                    ? `${import.meta.env.VITE_SERVER_URL.replace(
                        '/api',
                        ''
                      )}/images/${profile.avatar}`
                    : '/images/blank-profile-picture.png'
                }
                alt={profile.firstName || profile.fullName}
                className='object-contain rounded-full w-7 h-7'
              />
            </button>
          ) : (
            <NavLink to='/sign-in'>Sign In</NavLink>
          )}
        </div>
      </div>
      <ProfilePopup ref={profileRef} isShow={popups.profile} />
    </Wrapper>
  )
}

const Wrapper = tw.div`container  mx-auto h-[90px] relative`
const NavLink = styled(Link)`
  text-sm font-semibold text-primary-black
`

export default Navbar
