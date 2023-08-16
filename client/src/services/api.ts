import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { removeToken, setToken } from "../App/feature/auth/authSlice";
import { RootState } from "../App/store";

export const baseQueryWithAuth = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_SERVER_URL,
	credentials: "include",
	prepareHeaders: async (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken;

		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}

		return headers;
	},
});

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQueryWithAuth(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQueryWithAuth(
			{
				url: `/auth/refresh`,
				method: "POST",
			},
			api,
			extraOptions
		);

		if (refreshResult.data) {
			const refreshTokenResult = refreshResult.data as { accessToken: string };
			api.dispatch(setToken(refreshTokenResult.accessToken));
			result = await baseQueryWithAuth(args, api, extraOptions);
		} else {
			api.dispatch(removeToken);
		}
	}

	return result;
};
