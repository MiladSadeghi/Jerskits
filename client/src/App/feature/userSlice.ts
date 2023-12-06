import { IProduct } from '../../shared/types/Product.types'
import { IUserState, TBag } from '../../shared/types/User.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IUserState = {
  favorites: [],
  bag: {
    _id: '',
    items: [],
    user: '',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    subTotal: 0
  }
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
    },
    setBag: (state, { payload }: PayloadAction<TBag>) => {
      state.bag = payload
    },
    clearBag: (state) => {
      state.bag = initialState.bag
    }
  }
})

export const { setFavorites, addToFavorites, removeFromFavorites, setBag } =
  userSlice.actions
export default userSlice.reducer
