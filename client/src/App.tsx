import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Checkout,
  Edit,
  Favorites,
  Landing,
  Orders,
  Product,
  Setting,
  SignIn,
  SignUp
} from './pages'
import { AuthenticationLayout, Layout, ProfileLayout } from './layouts'
import {
  FullScreenLoader,
  OrderConfirmation,
  OrdersHistory,
  OngoingOrders,
  Products
} from './components'
import { useGetUserQuery } from './services'

import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const getUser = useGetUserQuery()

  if (getUser.isLoading) {
    return <FullScreenLoader />
  }

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <main>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route
              path='men'
              element={<Products gender='men' title='Men’s Jerskits' />}
            />
            <Route
              path='women'
              element={<Products gender='women' title='Women’s Jerskits' />}
            />
            <Route
              path='kid'
              element={<Products gender='kid' title='Kid’s Jerskits' />}
            />
            <Route path=':slug' element={<Product />} />
            <Route path='profile' element={<ProfileLayout />}>
              <Route path='edit' element={<Edit />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='orders' element={<Orders />}>
                <Route path='ongoing' element={<OngoingOrders />} />
                <Route path='history' element={<OrdersHistory />} />
              </Route>
              <Route path='setting' element={<Setting />} />
            </Route>
          </Route>
          <Route
            path='/sign-in'
            element={<AuthenticationLayout children={<SignIn />} />}
          />
          <Route
            path='/sign-up'
            element={<AuthenticationLayout children={<SignUp />} />}
          />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/:orderId' element={<OrderConfirmation />} />
        </Routes>
      </main>
    </Suspense>
  )
}

export default App
