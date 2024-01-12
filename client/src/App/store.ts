import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit'
import authSlice from './feature/auth/authSlice'
import profileSlice from './feature/profile/profileSlice'
import { profileApi } from '../services/profileApi'
import { locationApi } from '../services/locationApi'
import { authApi } from '../services/authApi'
import userApi from '../services/userApi'
import { landingPageApi } from '../services/LandingPageApi'
import { productApi } from '../services/productApi'
import { reviewApi } from '../services/reviewApi'
import userSlice from './feature/userSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [landingPageApi.reducerPath]: landingPageApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer
})

export const setupStore = (
  preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>
) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        profileApi.middleware,
        locationApi.middleware,
        userApi.middleware,
        landingPageApi.middleware,
        productApi.middleware,
        reviewApi.middleware
      ),
    preloadedState,
    devTools: import.meta.env.VITE_NODE_ENV !== 'production'
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
