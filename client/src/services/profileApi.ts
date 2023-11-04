import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './api'
import { setAvatar, setProfile } from '../App/feature/profile/profileSlice'
import toast from 'react-hot-toast'
import {
  IProfile,
  TGetProfileResponse,
  TUploadProfileAvatarRequest,
  TUploadProfileAvatarResponse
} from '../shared/types/Profile.types'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getUserProfile: build.query<{ profile: TGetProfileResponse }, void>({
      query() {
        return {
          url: '/profile'
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProfile(data.profile))
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
    updateUserProfile: build.mutation<
      { profile: IProfile },
      Omit<IProfile, 'avatar'>
    >({
      query(profile) {
        return {
          url: '/profile',
          method: 'PATCH',
          body: profile
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setProfile(data.profile))
        } catch (error: unknown) {
          if (typeof error === 'object' && error !== null) {
            const err = error as Record<string, unknown>
            toast.error(String(err.message))
          }
        }
      }
    }),
    uploadProfileAvatar: build.mutation<
      TUploadProfileAvatarResponse,
      TUploadProfileAvatarRequest
    >({
      query(avatar) {
        return {
          url: '/profile/profile-avatar',
          method: 'PUT',
          body: avatar
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAvatar(data.avatar))
        } catch (error) {
          if (typeof error === 'object' && error !== null) {
            const err = error as Record<string, unknown>
            toast.error(String(err.message))
          }
        }
      }
    })
  })
})

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadProfileAvatarMutation
} = profileApi
