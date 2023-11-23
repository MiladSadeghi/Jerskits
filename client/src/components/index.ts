import { lazy } from 'react'
import Navbar from './Navbar/Navbar'
import LocationProvider from './Location/LocationProvider'
import ProfilePopup from './Popups/ProfilePopup'
import FullScreenLoader from './FullScreenLoader/FullScreenLoader'
import ProfileLink from './ProfileLink/ProfileLink'
import ProductCard from './Products/ProductCard'
import ProductCardSkeleton from './Products/ProductCardSkeleton'
import Footer from './Footer/Footer'
import ProductSkeleton from './Products/ProductSkeleton'
import Accordion from './Accordion/Accordion'

import {
  ProductPrice,
  ProductDiscountPrice,
  ProductDiscountPercent,
  ProductShopCardBtn,
  ProductShopCardSizeBtn
} from './Products/Product.styles'

import ReviewRating from './Review/ReviewRating'
import Review from './Review/Review'
import ReviewForm from './Review/ReviewForm'

import ProductCardContainer from './Products/ProductCardContainer'

const Products = lazy(() => import('./Products/Products'))

export {
  Navbar,
  LocationProvider,
  ProfilePopup,
  FullScreenLoader,
  ProfileLink,
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
  ProductShopCardSizeBtn,
  ReviewRating,
  Review,
  ReviewForm,
  ProductCardContainer
}
