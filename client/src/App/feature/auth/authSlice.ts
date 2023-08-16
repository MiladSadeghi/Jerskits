import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSliceState } from "./authSlice.types";

const initialState: IAuthSliceState = {
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
