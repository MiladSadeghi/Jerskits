import tw from 'twin.macro'
import { Link, useLocation } from 'react-router-dom'
import styled from 'twin.macro'
import { useState, useRef, useEffect } from 'react'
import { ProfilePopup } from '..'
import { useAppSelector } from '../../App/hooks'
import { Bag, Hamburger, Heart, MagnifySearch } from '../../icons'
import FavoritesPopup from '../Popups/FavoritesPopup'
import BagPopup from '../Popups/BagPopup'
import BagModal from '../../modals/BagModal'
import { SearchModal } from '../../modals'
import NavbarMenu from './NavbarMenu'
import { useLazySearchProductsQuery } from '../../services'

function Navbar() {
  const [popups, setPopups] = useState<TPopups>({
    profile: false,
    favorites: false,
    bag: false
  })
  const profileRef = useRef<HTMLDialogElement | null>(null)
  const favoriteRef = useRef<HTMLDialogElement | null>(null)
  const bagRef = useRef<HTMLDialogElement | null>(null)
  const bagModalRef = useRef<HTMLDialogElement | null>(null)
  const searchModalRef = useRef<HTMLDialogElement | null>(null)
  const navBarMenuRef = useRef<HTMLDialogElement | null>(null)
  const profileBtnRef = useRef<HTMLButtonElement | null>(null)
  const favoriteBtnRef = useRef<HTMLButtonElement | null>(null)
  const bagBtnRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const authStatus = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.profile)
  const isPopupsOpen = Object.values(popups).some((popup) => popup)

  const [bagModal, setBagModal] = useState<boolean>(false)
  const [searchModal, setSearchModal] = useState<boolean>(false)
  const [isNavBarMenuOpen, setIsNavBarMenuOpen] = useState<boolean>(false)
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const [search, { isFetching, data, isSuccess }] = useLazySearchProductsQuery()

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
    const isBagModalOpen = bagModalRef.current?.contains(target as Node)
    const isSearchModalOpen = searchModalRef.current?.contains(target as Node)
    const isNavbarMenuOpen = navBarMenuRef.current?.contains(target as Node)

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

    if (!isBagModalOpen) {
      setBagModal(false)
    }
    if (!isSearchModalOpen) {
      setSearchModal(false)
    }

    if (!isNavbarMenuOpen) {
      setIsNavBarMenuOpen(false)
    }

    setPopups((prevPopups) => ({
      ...prevPopups,
      ...updatedPopups
    }))
  }

  const handleSearch = () => {
    search(searchInputValue)
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
    setIsNavBarMenuOpen(false)
  }, [location, bagModal, searchModal])

  useEffect(() => {
    setSearchModal(false)
  }, [location])

  useEffect(() => {
    setIsNavBarMenuOpen(false)
  }, [popups.profile, popups.favorites, popups.bag])

  return (
    <>
      {(isPopupsOpen || bagModal || searchModal || isNavBarMenuOpen) && (
        <div
          className={`
        ${bagModal || searchModal || isNavBarMenuOpen ? 'z-[102]' : 'z-[60]'}
        fixed top-0 right-0  w-full h-full bg-transparent-30`}
        />
      )}

      <BagModal isBagModal={[bagModal, setBagModal]} ref={bagModalRef} />
      <SearchModal
        searchInput={[searchInputValue, setSearchInputValue]}
        isSearchModal={[searchModal, setSearchModal]}
        ref={searchModalRef}
        data={data}
        isLoading={isFetching}
        isSuccess={isSuccess}
        handleSearch={handleSearch}
      />
      <NavbarMenu
        searchInput={[searchInputValue, setSearchInputValue]}
        isOpenState={[isNavBarMenuOpen, setIsNavBarMenuOpen]}
        handlePopups={handlePopupOpen}
        handleSearch={handleSearch}
        handleSearchModal={setSearchModal}
        ref={navBarMenuRef}
      />
      <nav className='md:relative z-[101] bg-white'>
        <Wrapper>
          <div className='flex items-center justify-between w-full h-full'>
            <div
              className='block cursor-pointer md:hidden'
              onClick={() => setIsNavBarMenuOpen(true)}
            >
              <Hamburger />
            </div>

            <Link to='/'>
              <img src={'/images/jerskits-black.jpg'} alt='Home' />
            </Link>

            <div className='hidden gap-10 md:flex'>
              <NavLink to='/men'>Men</NavLink>
              <NavLink to='/women'>Women</NavLink>
              <NavLink to='/kid'>Kids</NavLink>
            </div>
            <div className='flex items-center gap-10'>
              <div className='flex items-center gap-10'>
                <div className='w-5 h-5'>
                  <button
                    aria-label='open search modal'
                    name='openSearchModal'
                    onClick={() => setSearchModal(true)}
                  >
                    <MagnifySearch />
                  </button>
                </div>
                <div className='hidden w-5 h-5 leading-none md:block'>
                  <button
                    aria-label='open bag popup'
                    name='openShoppingBag'
                    ref={bagBtnRef}
                    onClick={() => handlePopupOpen('bag')}
                  >
                    <Bag />
                  </button>
                </div>
                <div className='hidden w-5 h-5 leading-none md:block'>
                  <button
                    aria-label='open favorites popup'
                    name='openFavoritesPopup'
                    onClick={() => handlePopupOpen('favorites')}
                    ref={favoriteBtnRef}
                  >
                    <Heart />
                  </button>
                </div>
                <BagPopup
                  ref={bagRef}
                  isOpen={popups.bag}
                  handleBagModal={setBagModal}
                  handlePopup={handlePopupOpen}
                />
                <FavoritesPopup
                  ref={favoriteRef}
                  handlePopup={handlePopupOpen}
                  isOpen={popups.favorites}
                />
              </div>
              <div className=''>
                {authStatus ? (
                  <div className='flex md:relative'>
                    <button
                      ref={profileBtnRef}
                      className='hidden md:block'
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
                    <ProfilePopup
                      ref={profileRef}
                      isOpen={popups.profile}
                      handlePopup={handlePopupOpen}
                    />
                  </div>
                ) : (
                  <NavLink to='/sign-in'>Sign In</NavLink>
                )}
              </div>
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
