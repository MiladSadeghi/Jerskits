import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuthSlice } from '../../../shared/types/Auth.types'

const initialState: IAuthSlice = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload
    }
  }
})
export const { setAuthStatus } = authSlice.actions
export default authSlice.reducer
