import { lazy } from 'react'
import Navbar from './Navbar/Navbar'
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
import UserForm from './Form/UserForm'

import Button from './Button/Button'

import Avatar from './Avatar/Avatar'

import SearchDropdown from './Dropdown/LocationDropdown'

import CheckoutSteps from './Checkout/CheckoutSteps'
import CheckoutSummary from './Checkout/CheckoutSummary'
import CheckoutDelivery from './Checkout/CheckoutDelivery'
import DeliverySummary from './Checkout/DeliverySummary'
import OrderConfirmation from './Order/OrderConfirmation'
import OrdersHistory from './Order/OrdersHistory'
import OngoingOrders from './Order/OngoingOrders'
import OrderSummary from './Order/OrderSummary'
import InformationSummary from './Checkout/InformationSummary'
import CheckoutPayment from './Checkout/CheckoutPayment'

export {
  Navbar,
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
  SearchDropdown,
  UserForm,
  CheckoutSteps,
  CheckoutSummary,
  CheckoutDelivery,
  DeliverySummary,
  OrderConfirmation,
  OrdersHistory,
  OrderSummary,
  OngoingOrders,
  InformationSummary,
  CheckoutPayment
}
