import { NavLink, useLocation } from 'react-router-dom'
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
import { cn } from '../../utils/utils'
import { useOutsideClick } from '../../hooks/useOutsideClick'

function Navbar() {
  const [profilePopup, setProfilePopup] = useState<boolean>(false)
  const [favoritesPopup, setFavoritesPopup] = useState<boolean>(false)
  const [bagPopup, setBagPopup] = useState<boolean>(false)

  const navBarMenuRef = useRef<HTMLDialogElement | null>(null)
  const profileBtnRef = useRef<HTMLButtonElement | null>(null)
  const favoritesBtnRef = useRef<HTMLButtonElement | null>(null)
  const bagBtnRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()
  const authStatus = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.profile)
  const isPopupsOpen = [profilePopup, favoritesPopup, bagPopup].some(
    (popup) => popup
  )

  const profileRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setProfilePopup(false),
    triggerRef: profileBtnRef
  })
  const favoritesRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setFavoritesPopup(false),
    triggerRef: favoritesBtnRef
  })

  const bagRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setBagPopup(false),
    triggerRef: bagBtnRef
  })

  const searchModalRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setSearchModal(false),
    triggerRef: bagBtnRef
  })

  const bagModalRef = useOutsideClick<HTMLDialogElement, HTMLButtonElement>({
    callback: () => setBagModal(false)
  })

  const [bagModal, setBagModal] = useState<boolean>(false)
  const [searchModal, setSearchModal] = useState<boolean>(false)
  const [isNavBarMenuOpen, setIsNavBarMenuOpen] = useState<boolean>(false)
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const [search, { isFetching, data, isSuccess }] = useLazySearchProductsQuery()

  const handleSearch = () => {
    search(searchInputValue)
  }

  useEffect(() => {
    setProfilePopup(false)
    setFavoritesPopup(false)
    setBagPopup(false)

    setIsNavBarMenuOpen(false)
  }, [location, bagModal, searchModal])

  useEffect(() => {
    setSearchModal(false)
  }, [location])

  useEffect(() => {
    setIsNavBarMenuOpen(false)
  }, [profilePopup, favoritesPopup, bagPopup])

  return (
    <>
      {(isPopupsOpen || bagModal || searchModal || isNavBarMenuOpen) && (
        <div
          className={cn(
            'fixed top-0 right-0  w-full h-full bg-transparent-30 z-[60]',
            { 'z-[102]': bagModal }
          )}
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
        openProfilePopup={() => setProfilePopup(true)}
        openFavoritesPopup={() => setFavoritesPopup(true)}
        openBagPopup={() => setBagPopup(true)}
        handleSearch={handleSearch}
        handleSearchModal={setSearchModal}
        ref={navBarMenuRef}
      />
      <nav className='md:relative z-[101] bg-white'>
        <div className='container mx-auto h-[90px]'>
          <div className='flex items-center justify-between w-full h-full'>
            <div
              className='block cursor-pointer md:hidden'
              onClick={() => setIsNavBarMenuOpen(true)}
            >
              <Hamburger />
            </div>

            <NavLink to='/'>
              <img src={'/images/jerskits-black.jpg'} alt='Home' />
            </NavLink>

            <div className='hidden gap-10 md:flex'>
              <NavLink
                className='text-sm font-semibold text-primary-black'
                to='/men'
              >
                Men
              </NavLink>
              <NavLink
                className='text-sm font-semibold text-primary-black'
                to='/women'
              >
                Women
              </NavLink>
              <NavLink
                className='text-sm font-semibold text-primary-black'
                to='/kid'
              >
                Kids
              </NavLink>
            </div>
            <div className='flex items-center gap-10'>
              <div className='relative flex items-center gap-10'>
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
                    onClick={() => setBagPopup(true)}
                  >
                    <Bag />
                  </button>
                </div>
                <div className='hidden w-5 h-5 leading-none md:block'>
                  <button
                    aria-label='open favorites popup'
                    name='openFavoritesPopup'
                    onClick={() => setFavoritesPopup(true)}
                    ref={favoritesBtnRef}
                  >
                    <Heart />
                  </button>
                </div>
                <BagPopup
                  ref={bagRef}
                  isOpen={bagPopup}
                  handleBagModal={setBagModal}
                  closePopup={() => setBagPopup(false)}
                />
                <FavoritesPopup
                  ref={favoritesRef}
                  closePopup={() => setFavoritesPopup(false)}
                  isOpen={favoritesPopup}
                />
              </div>
              <div className=''>
                {authStatus ? (
                  <div className='flex md:relative'>
                    <button
                      ref={profileBtnRef}
                      className='hidden md:block'
                      onClick={() => setProfilePopup(true)}
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
                      isOpen={profilePopup}
                      closePopup={() => setProfilePopup(false)}
                    />
                  </div>
                ) : (
                  <NavLink
                    className='hidden text-sm font-semibold text-primary-black md:block'
                    to='/sign-in'
                  >
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
