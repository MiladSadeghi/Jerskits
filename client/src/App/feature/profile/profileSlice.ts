import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../../shared/types/Profile.types";

const initialState: IProfile = {
	fullName: "",
	email: "",
	firstName: "",
	lastName: "",
	avatar: "",
	contactEmail: "",
	phoneNumber: "",
	saveAddress: false,
	shippingAddress: {
		address: "",
		country: "",
		state: "",
		city: "",
		postalCode: 0,
	},
};

const profileSlice = createSlice({
	name: "profileSlice",
	initialState,
	reducers: {
		setProfile: (state, { payload }: PayloadAction<IProfile>) => {
			state.fullName = payload.fullName ?? state.fullName;
			state.firstName = payload.firstName ?? state.firstName;
			state.lastName = payload.lastName ?? state.lastName;
			state.email = payload.email ?? state.email;
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
