import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IAddToBagRequest,
  IAddToBagResponse,
  IFavoriteOperationResponse,
  IGetBag,
  IGetUserFavoritesResponse,
  IGetUserResponse,
  IRemoveFromBagRequest,
  IRemoveFromBagResponse,
  IUpdateBagItemQuantityRequest,
  IUpdateBagItemQuantityResponse,
  IUpdateBagItemSizeRequest,
  IUpdateBagItemSizeResponse
} from '../shared/types/User.types'
import { baseQueryWithReauth } from './api'
import { setProfile } from '../App/feature/profile/profileSlice'
import toast from 'react-hot-toast'
import { setAuthStatus } from '../App/feature/auth/authSlice'
import {
  addToFavorites,
  removeFromFavorites,
  setBag,
  setFavorites,
  setOrders,
  setPayment
} from '../App/feature/userSlice'
import {
  IGetOrderRequest,
  IGetOrderResponse,
  IGetOrdersResponse,
  TValidateCheckoutInformationRequest,
  TValidateCheckoutDeliveryRequest,
  TValidateCheckoutPaymentRequest,
  TValidateCheckoutInformationResponse,
  TPlaceOrderRequest,
  TPlaceOrderResponse
} from '../shared/types/Order.types'

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
          if (data.favorites) dispatch(setFavorites(data.favorites))
          if (data.bag) dispatch(setBag(data.bag))
          if (data.orders) dispatch(setOrders(data.orders))
          if (data.payment) dispatch(setPayment(data.payment))
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
          if (data.favorites) dispatch(setFavorites(data.favorites))
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
    }),
    getBag: build.query<IGetBag, undefined>({
      query() {
        return {
          url: 'user/bag',
          method: 'GET'
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data?.bag) dispatch(setBag(data?.bag))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    addToBag: build.mutation<IAddToBagResponse, IAddToBagRequest>({
      query({ productId, size }) {
        {
          return {
            url: 'user/bag',
            method: 'POST',
            body: {
              productId,
              size
            }
          }
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)
          dispatch(setBag(data.bag))
        } catch (error) {
          const err = error as Error
          toast.error(err.message)
        }
      }
    }),
    removeFromBag: build.mutation<
      IRemoveFromBagResponse,
      IRemoveFromBagRequest
    >({
      query({ productId }) {
        {
          return {
            url: `user/bag/${productId}`,
            method: 'DELETE'
          }
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          toast.success(data.message)
          dispatch(setBag(data.bag))
        } catch (error) {
          const err = error as Error
          toast.error(err.message)
        }
      }
    }),
    updateBagItemQuantity: build.mutation<
      IUpdateBagItemQuantityResponse,
      IUpdateBagItemQuantityRequest
    >({
      query({ productId, quantity }) {
        return {
          url: `user/bag/quantity`,
          method: 'PATCH',
          body: {
            productId,
            quantity
          }
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setBag(data.bag))
        } catch (error) {
          const err = error as Error
          toast.error(err.message)
        }
      }
    }),
    updateBagItemSize: build.mutation<
      IUpdateBagItemSizeResponse,
      IUpdateBagItemSizeRequest
    >({
      query({ newSize, productId }) {
        return {
          url: 'user/bag/size',
          method: 'PATCH',
          body: {
            newSize,
            productId
          }
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setBag(data.bag))
        } catch (error) {
          const err = error as Error
          toast.error(err.message)
        }
      }
    }),
    getOrders: build.query<IGetOrdersResponse, void>({
      query() {
        return {
          url: 'user/orders'
        }
      }
    }),
    getOrder: build.query<IGetOrderResponse, IGetOrderRequest>({
      query(orderId) {
        return {
          url: `user/orders/${orderId}`,
          method: 'GET'
        }
      }
    }),
    validateCheckoutInformation: build.mutation<
      TValidateCheckoutInformationResponse,
      TValidateCheckoutInformationRequest
    >({
      query(information) {
        return {
          url: 'user/checkout/validate/information',
          method: 'POST',
          body: information
        }
      }
    }),
    validateCheckoutDelivery: build.mutation<
      undefined,
      TValidateCheckoutDeliveryRequest
    >({
      query(delivery) {
        return {
          url: 'user/checkout/validate/delivery',
          method: 'POST',
          body: delivery,
          responseHandler: 'text'
        }
      }
    }),
    validateCheckoutPayment: build.mutation<
      undefined,
      TValidateCheckoutPaymentRequest
    >({
      query(payment) {
        return {
          url: 'user/checkout/validate/payment',
          method: 'POST',
          body: payment,
          responseHandler: (response) => {
            if (response.status === 400) {
              return response.json()
            }
            return response.text()
          }
        }
      }
    }),
    placeOrder: build.mutation<TPlaceOrderResponse, TPlaceOrderRequest>({
      query(placeOrder) {
        return {
          url: 'user/orders',
          method: 'POST',
          body: placeOrder
        }
      }
    })
  })
})

export const {
  useGetUserQuery,
  useGetUserFavoritesQuery,
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation,
  useGetBagQuery,
  useAddToBagMutation,
  useRemoveFromBagMutation,
  useUpdateBagItemQuantityMutation,
  useUpdateBagItemSizeMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useValidateCheckoutInformationMutation,
  useValidateCheckoutDeliveryMutation,
  useValidateCheckoutPaymentMutation,
  usePlaceOrderMutation
} = userApi

export default userApi
