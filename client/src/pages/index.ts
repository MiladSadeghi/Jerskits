import { lazy } from 'react'

const SignIn = lazy(() => import('./SignIn/SignIn'))
const SignUp = lazy(() => import('./SignUp/SignUp'))
const Edit = lazy(() => import('./Profile/Edit/Edit'))
const Favorites = lazy(() => import('./Profile/Favorites/Favorites'))
const Orders = lazy(() => import('./Profile/Orders'))
const Setting = lazy(() => import('./Profile/Setting'))
const Landing = lazy(() => import('./Landing/Landing'))
const Product = lazy(() => import('./Product/Product'))
const Checkout = lazy(() => import('./Checkout/Checkout'))
import NotFound from './NotFound/NotFound'

export {
  SignIn,
  SignUp,
  Edit,
  Favorites,
  Orders,
  Setting,
  Landing,
  Product,
  Checkout,
  NotFound
}
