import { IOrder, IOrderPayment } from '../../shared/types/Order.types'
import { IProduct } from '../../shared/types/Product.types'
import { IUserSlice, TBag } from '../../shared/types/User.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IUserSlice = {
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
    },
    setOrders: (state, { payload }: PayloadAction<IOrder[]>) => {
      state.orders = payload
    },
    addOrder: (state, { payload }: PayloadAction<IOrder>) => {
      state.orders?.push(payload)
    },
    removeOrder: (state, { payload }: PayloadAction<number>) => {
      state.orders = state.orders?.filter(
        (order) => order?.orderNumber !== payload
      )
    },
    setPayment: (state, { payload }: PayloadAction<IOrderPayment>) => {
      state.payment = payload
    }
  }
})

export const {
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  setBag,
  clearBag,
  setOrders,
  addOrder,
  removeOrder,
  setPayment
} = userSlice.actions
export default userSlice.reducer
