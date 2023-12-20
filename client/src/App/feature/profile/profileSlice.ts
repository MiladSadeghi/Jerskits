import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../../../shared/types/Profile.types'

const initialState: IProfile = {}

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<IProfile>) => {
      state.fullName = payload?.fullName ?? state.fullName
      state.firstName = payload?.firstName ?? state.firstName
      state.lastName = payload?.lastName ?? state.lastName
      state.email = payload?.email ?? state.email
      state.contactEmail = payload?.contactEmail ?? state.contactEmail
      state.phoneNumber = payload?.phoneNumber ?? state.phoneNumber
      state.avatar = payload?.avatar ?? state.avatar
      state.createdAt = payload?.createdAt ?? state.createdAt
    },
    setAvatar: (state, { payload }: PayloadAction<string>) => {
      state.avatar = payload
    },
    clearProfile: (state) => {
      state.avatar = initialState.avatar
      state.fullName = initialState.fullName
      state.firstName = initialState.firstName
      state.lastName = initialState.lastName
      state.email = initialState.email
      state.contactEmail = initialState.contactEmail
      state.phoneNumber = initialState.phoneNumber
      state.saveAddress = initialState.saveAddress
      state.createdAt = initialState.createdAt
      state.avatar = initialState.avatar
    }
  }
})

export const { setProfile, setAvatar, clearProfile } = profileSlice.actions
export default profileSlice.reducer
