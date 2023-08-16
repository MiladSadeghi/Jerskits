import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSlice } from "../../../shared/types/Auth.types";

const initialState: IAuthSlice = {
	accessToken: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		setToken: (state, { payload }: PayloadAction<string>) => {
			state.accessToken = payload;
			state.isAuthenticated = true;
		},
		removeToken: (state) => {
			state.accessToken = null;
			state.isAuthenticated = false;
		},
	},
});
export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
