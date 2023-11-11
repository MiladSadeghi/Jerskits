import { lazy } from 'react'
import Navbar from './Navbar/Navbar'
import LocationProvider from './Location/LocationProvider'
import ProfilePopup from './Popups/ProfilePopup'
import FullScreenLoader from './FullScreenLoader/FullScreenLoader'
import HeaderController from './LandingPage/HeaderController'
import HeaderSlide from './LandingPage/HeaderSlide'
import ProfileLink from './ProfileLink/ProfileLink'
import KidCollectionController from './LandingPage/KidCollectionSlideController'
import KidCollectionSlider from './LandingPage/KidCollectionSlider'
import ProductCard from './ProductCard/ProductCard'
import ProductCardSkeleton from './ProductCard/ProductCardSkeleton'
import Footer from './Footer/Footer'
const Products = lazy(() => import('./Products/Products'))
import ProductSkeleton from './ProductSkeleton/ProductSkeleton'
import Accordion from './Accordion/Accordion'
import {
  ProductPrice,
  ProductDiscountPrice,
  ProductDiscountPercent,
  ProductShopCardBtn,
  ProductShopCardSizeBtn
} from './Products/Product.styles'

export {
  Navbar,
  LocationProvider,
  ProfilePopup,
  FullScreenLoader,
  HeaderController,
  HeaderSlide,
  ProfileLink,
  KidCollectionController,
  KidCollectionSlider,
  ProductCard,
  ProductCardSkeleton,
  Products,
  Footer,
  ProductSkeleton,
  Accordion,
  ProductPrice,
  ProductDiscountPrice,
  ProductDiscountPercent,
  ProductShopCardBtn,
  ProductShopCardSizeBtn
}
