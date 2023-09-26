import Navbar from './Navbar/Navbar'
import LocationProvider from './Location/LocationProvider'
import ProfilePopup from './Popups/ProfilePopup'
import FullScreenLoader from './FullScreenLoader/FullScreenLoader'
import HeaderController from './LandingPage/HeaderController'
import { lazy } from 'react'

const HeaderSlideLazy = lazy(() => import('./LandingPage/HeaderSlide'))

export {
  Navbar,
  LocationProvider,
  ProfilePopup,
  FullScreenLoader,
  HeaderController,
  HeaderSlideLazy
}
