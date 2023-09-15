import {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation
} from './authApi'

import { useLazyGetLocationQuery } from './locationApi'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation
} from './profileApi'

import { useGetLandingPageQuery } from './LandingPageApi'

export {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useLazyGetLocationQuery,
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
  useGetLandingPageQuery
}
