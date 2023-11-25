import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IFavoriteOperationResponse,
  IGetUserFavoritesResponse,
  IGetUserResponse
} from '../shared/types/User.types'
import { baseQueryWithReauth } from './api'
import { setProfile } from '../App/feature/profile/profileSlice'
import toast from 'react-hot-toast'
import { setAuthStatus } from '../App/feature/auth/authSlice'
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites
} from '../App/feature/userSlice'

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUser: build.query<IGetUserResponse, void>({
      query() {
        return {
          url: '/user'
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProfile(data.profile))
          dispatch(setAuthStatus(true))
          dispatch(setFavorites(data.favorites))
        } catch (error: unknown) {
          if (typeof error === 'object' && error !== null) {
            const err = error as Record<string, unknown>
            if (err.error && typeof err.error === 'object') {
              const errStatus = err.error as Record<string, unknown>
              if (errStatus.status === 'FETCH_ERROR') {
                toast.error('Cant login, try again later or refresh the page')
              } else if (errStatus.status === 404) {
                toast.error('cant get your profile!, please refresh the page')
              }
            }
          }
        }
      }
    }),
    getUserFavorites: build.query<IGetUserFavoritesResponse, void>({
      query() {
        return {
          url: '/user/favorites'
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setFavorites(data.favorites))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    addProductToFavorites: build.mutation<IFavoriteOperationResponse, string>({
      query(productId) {
        return {
          url: '/user/favorites',
          method: 'POST',
          body: {
            productId
          }
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)
          dispatch(addToFavorites(data.product))
        } catch (error) {
          console.log('error on add product in favorites')
        }
      }
    }),
    removeProductFromFavorites: build.mutation<
      IFavoriteOperationResponse,
      string
    >({
      query(productId) {
        return {
          url: `user/favorites/${productId}`,
          method: 'DELETE'
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(removeFromFavorites(arg))
          toast.success(data.message)
        } catch (error) {
          console.log('error on remove product from favorites')
        }
      }
    })
  })
})

export const {
  useGetUserQuery,
  useGetUserFavoritesQuery,
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation
} = userApi

export default userApi
