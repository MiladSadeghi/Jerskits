import tw from 'twin.macro'
import { Link, useLocation } from 'react-router-dom'
import styled from 'twin.macro'
import { useState, useRef, useEffect } from 'react'
import { ProfilePopup } from '..'
import { useAppSelector } from '../../App/hooks'
import { Bag, Heart, MagnifySearch } from '../../icons'
import FavoritesPopup from '../Popups/FavoritesPopup'
import BagPopup from '../Popups/BagPopup'

type TPopups = {
  profile: boolean
  favorites: boolean
  bag: boolean
}

function Navbar() {
  const [popups, setPopups] = useState<TPopups>({
    profile: false,
    favorites: false,
    bag: false
  })
  const profileRef = useRef<HTMLDialogElement | null>(null)
  const favoriteRef = useRef<HTMLDialogElement | null>(null)
  const bagRef = useRef<HTMLDialogElement | null>(null)
  const profileBtnRef = useRef<HTMLButtonElement | null>(null)
  const favoriteBtnRef = useRef<HTMLButtonElement | null>(null)
  const bagBtnRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const authStatus = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.profile)
  const isPopupsOpen = Object.values(popups).some((popup) => popup)

  const handlePopupOpen = (popup: keyof TPopups) => {
    setPopups((prevPopups) => ({
      ...prevPopups,
      [popup]: !prevPopups[popup]
    }))
  }

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const { target } = event
    const isProfilePopupOpen = profileRef.current?.contains(target as Node)
    const isFavoritePopupOpen = favoriteRef.current?.contains(target as Node)
    const isProfileButtonClicked = profileBtnRef.current?.contains(
      target as Node
    )
    const isFavoriteButtonClicked = favoriteBtnRef.current?.contains(
      target as Node
    )
    const isBagPopupOpen = bagRef.current?.contains(target as Node)
    const isBagButtonClicked = bagBtnRef.current?.contains(target as Node)

    const updatedPopups: Partial<TPopups> = {}

    if (!isProfilePopupOpen && !isProfileButtonClicked) {
      updatedPopups.profile = false
    }

    if (!isFavoritePopupOpen && !isFavoriteButtonClicked) {
      updatedPopups.favorites = false
    }

    if (!isBagPopupOpen && !isBagButtonClicked) {
      updatedPopups.bag = false
    }

    setPopups((prevPopups) => ({
      ...prevPopups,
      ...updatedPopups
    }))
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
      profile: false,
      favorites: false,
      bag: false
    })
  }, [location])

  return (
    <>
      <div
        className={`${
          isPopupsOpen ? 'block' : 'hidden'
        } fixed top-0 right-0 z-20 w-full h-full bg-transparent-30`}
      />
      <nav className='relative z-30 bg-white'>
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
              <div className='w-5 h-5'>
                <button aria-label='search'>
                  <MagnifySearch />
                </button>
              </div>
              <div className='relative w-5 h-5 leading-none'>
                <button
                  aria-label='bag'
                  ref={bagBtnRef}
                  onClick={() => handlePopupOpen('bag')}
                >
                  <Bag />
                </button>
                <BagPopup ref={bagRef} open={popups.bag} />
              </div>
              <div className='relative w-5 h-5 leading-none'>
                <button
                  aria-label='favorite'
                  onClick={() => handlePopupOpen('favorites')}
                  ref={favoriteBtnRef}
                >
                  <Heart />
                </button>
                <FavoritesPopup ref={favoriteRef} open={popups.favorites} />
              </div>
              {authStatus ? (
                <div className='relative flex'>
                  <button
                    ref={profileBtnRef}
                    onClick={() => handlePopupOpen('profile')}
                  >
                    <img
                      crossOrigin='anonymous'
                      src={
                        profile.avatar
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
                  <ProfilePopup ref={profileRef} open={popups.profile} />
                </div>
              ) : (
                <NavLink to='/sign-in'>Sign In</NavLink>
              )}
            </div>
          </div>
        </Wrapper>
      </nav>
    </>
  )
}

const Wrapper = tw.div`container mx-auto h-[90px]`
const NavLink = styled(Link)`
  text-sm font-semibold text-primary-black
`

export default Navbar
