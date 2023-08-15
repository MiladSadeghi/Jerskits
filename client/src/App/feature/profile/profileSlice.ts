import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "./profileSlice.types";

const initialState: IProfile = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  contactEmail: '',
  phoneNumber: '',
  saveAddress: false,
  shippingAddress: {
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: 0,
  },
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<IProfile>) => {
      state.username = payload.username ?? state.username;
      state.firstName = payload.firstName ?? state.firstName;
      state.lastName = payload.lastName ?? state.lastName;
      state.contactEmail = payload.contactEmail ?? state.contactEmail;
      state.phoneNumber = payload.phoneNumber ?? state.phoneNumber;
      state.avatar = payload.avatar ?? state.avatar;
      state.shippingAddress = {
        ...state.shippingAddress,
        ...(payload.shippingAddress ?? {}),
      };
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
