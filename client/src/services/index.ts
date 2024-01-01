import {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation
} from './authApi'

import { useLazyGetLocationQuery } from './locationApi'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadProfileAvatarMutation
} from './profileApi'

import {
  useGetLandingPageQuery,
  useLazyGetKidBrandCollectionQuery
} from './LandingPageApi'

import {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useLazySearchProductsQuery
} from './productApi'

import {
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
} from './userApi'

export {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useLazyGetLocationQuery,
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
  useGetLandingPageQuery,
  useLazyGetKidBrandCollectionQuery,
  useLazyGetProductsQuery,
  useUploadProfileAvatarMutation,
  useGetProductQuery,
  useGetUserQuery,
  useGetUserFavoritesQuery,
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation,
  useGetBagQuery,
  useAddToBagMutation,
  useRemoveFromBagMutation,
  useUpdateBagItemQuantityMutation,
  useUpdateBagItemSizeMutation,
  useLazySearchProductsQuery,
  useGetOrderQuery,
  useGetOrdersQuery,
  useValidateCheckoutInformationMutation,
  useValidateCheckoutDeliveryMutation,
  useValidateCheckoutPaymentMutation,
  usePlaceOrderMutation
}
