import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Edit,
  Favorites,
  Landing,
  Orders,
  Setting,
  SignIn,
  SignUp
} from './pages'
import { AuthenticationLayout, Layout, ProfileLayout } from './layouts'
import 'swiper/css'
import 'react-loading-skeleton/dist/skeleton.css'
import { FullScreenLoader } from './components'

function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <main>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='profile' element={<ProfileLayout />}>
              <Route path='edit' element={<Edit />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='orders' element={<Orders />} />
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
        </Routes>
      </main>
    </Suspense>
  )
}

export default App
