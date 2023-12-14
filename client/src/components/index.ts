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

import ProductPrice from './Products/ProductPrice'
import ProductDiscountPrice from './Products/ProductDiscountPrice'
import ProductDiscountPercent from './Products/ProductDiscountPercent'
import ProductSize from './Products/ProductSize'

import ReviewRating from './Review/ReviewRating'
import Review from './Review/Review'
import ReviewForm from './Review/ReviewForm'

import ProductCardContainer from './Products/ProductCardContainer'

import BagDropdown from './Dropdown/BagDropdown'

const Products = lazy(() => import('./Products/Products'))

import FormLabel from './Form/FormLabel'
import FormInput from './Form/FormInput'
import FormError from './Form/FormError'

import Button from './Button/Button'

import Avatar from './Avatar/Avatar'

import SearchDropdown from './Dropdown/SearchDropdown'

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
  ProductSize,
  ReviewRating,
  Review,
  ReviewForm,
  ProductCardContainer,
  BagDropdown,
  FormLabel,
  FormInput,
  FormError,
  Button,
  Avatar,
  SearchDropdown
}
