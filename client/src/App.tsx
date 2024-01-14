import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Checkout,
  Edit,
  Favorites,
  Landing,
  NotFound,
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
    <main>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={'Please wait...'}>
                <Landing />
              </Suspense>
            }
          />

          <Route
            path='men'
            element={
              <Suspense fallback={'Please wait...'}>
                <Products gender='men' title='Men’s Jerskits' />
              </Suspense>
            }
          />
          <Route
            path='women'
            element={
              <Suspense fallback={'Please wait...'}>
                <Products gender='women' title='Women’s Jerskits' />
              </Suspense>
            }
          />
          <Route
            path='kid'
            element={
              <Suspense fallback={'Please wait...'}>
                <Products gender='kid' title='Kid’s Jerskits' />
              </Suspense>
            }
          />
          <Route
            path=':slug'
            element={
              <Suspense fallback={'Please wait...'}>
                <Product />
              </Suspense>
            }
          />

          <Route path='profile' element={<ProfileLayout />}>
            <Route
              path='edit'
              element={
                <Suspense fallback={'Please wait...'}>
                  <Edit />
                </Suspense>
              }
            />
            <Route
              path='favorites'
              element={
                <Suspense fallback={'Please wait...'}>
                  <Favorites />
                </Suspense>
              }
            />
            <Route
              path='orders'
              element={
                <Suspense fallback={'Please wait...'}>
                  <Orders />
                </Suspense>
              }
            >
              <Route path='ongoing' element={<OngoingOrders />} />
              <Route path='history' element={<OrdersHistory />} />
            </Route>
            <Route
              path='setting'
              element={
                <Suspense fallback={'Please wait...'}>
                  <Setting />
                </Suspense>
              }
            />
          </Route>
          <Route path='/404' element={<NotFound />} />
        </Route>
        <Route element={<AuthenticationLayout />}>
          <Route
            path='/sign-in'
            element={
              <Suspense fallback={'Please wait...'}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path='/sign-up'
            element={
              <Suspense fallback={'Please wait...'}>
                <SignUp />
              </Suspense>
            }
          />
        </Route>

        <Route
          path='checkout'
          element={
            <Suspense fallback={'Please wait...'}>
              <Checkout />
            </Suspense>
          }
        />
        <Route path='checkout/:orderId' element={<OrderConfirmation />} />
      </Routes>
    </main>
  )
}

export default App
