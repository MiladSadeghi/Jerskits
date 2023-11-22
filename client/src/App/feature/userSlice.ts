import { IProduct } from '../../shared/types/Product.types'
import { IUserState } from '../../shared/types/User.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IUserState = {
  favorites: []
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    setFavorites: (state, { payload }: PayloadAction<IProduct[]>) => {
      state.favorites = payload
    },
    addToFavorites: (state, { payload }: PayloadAction<IProduct>) => {
      state.favorites.push(payload)
    },
    removeFromFavorites: (state, { payload }: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (product) => product._id !== payload
      )
    }
  }
})

export const { setFavorites, addToFavorites, removeFromFavorites } =
  userSlice.actions
export default userSlice.reducer
