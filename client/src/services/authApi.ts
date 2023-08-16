import {
	BaseQueryFn,
	FetchArgs,
	createApi,
} from "@reduxjs/toolkit/query/react";

import { toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { baseQueryWithAuth } from "./api";
import { removeToken, setToken } from "../App/feature/auth/authSlice";
import { setProfile } from "../App/feature/profile/profileSlice";
import {
	TAuthResponseError,
	TDecodedJWT,
	TSignInRequest,
	TSignUpRequest,
} from "../shared/types/Auth.types";

export const authApi = createApi({
	reducerPath: "authSliceApi",
	baseQuery: baseQueryWithAuth as BaseQueryFn<
		FetchArgs,
		unknown,
		TAuthResponseError
	>,
	endpoints: (build) => ({
		SignUp: build.mutation<{ accessToken: string }, TSignUpRequest>({
			query({ email, password, fullName }) {
				return {
					url: "/auth/sign-up",
					method: "POST",
					body: { email, password, fullName },
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data.accessToken));
				} catch (error: unknown) {
					const typedError = error as TAuthResponseError;
					toast.error(typedError?.data?.message);
				}
			},
		}),
		SignIn: build.mutation<{ accessToken: string }, TSignInRequest>({
			query({ email, password }) {
				return {
					url: "/auth/sign-in",
					method: "POST",
					body: { email, password },
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data.accessToken));
				} catch (error: unknown) {
					const typedError = error as TAuthResponseError;
					const errorMessage =
						typedError?.data?.message || "Try again later...";
					toast.error(errorMessage);
				}
			},
		}),
		RefreshToken: build.query<{ accessToken: string }, void>({
			query() {
				return {
					url: "/auth/refresh",
					method: "GET",
					credentials: "include",
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setToken(data.accessToken));
					const decodeJWT: TDecodedJWT = jwtDecode(data.accessToken);
					dispatch(setProfile(decodeJWT));
				} catch (error: unknown) {
					const typedError = error as TAuthResponseError;
					if (typedError.status === "FETCH_ERROR") {
						toast.error("Can't login, try again later or refresh the page");
					}
				}
			},
		}),
		SignOut: build.mutation<void, void>({
			query() {
				return {
					url: "/auth/logout",
					method: "DELETE",
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(removeToken());
					toast.success("You have successfully signed out");
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				} catch (error: unknown) {
					const typedError = error as TAuthResponseError;
					if (typedError?.status === "FETCH_ERROR") {
						toast.error("Can't login, try again later or refresh the page");
					} else {
						toast.error("Sign out failed. Please try again later");
					}
				}
			},
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useRefreshTokenQuery,
	useSignOutMutation,
} = authApi;
