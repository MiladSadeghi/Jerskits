import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { removeToken, setToken } from "../feature/auth/authSlice";
import { RootState } from "../store";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  prepareHeaders: async (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    headers.set("Accept", "application/json");
    headers.set("Cache-Control", "no-cache");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

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
        url: `/auth/refresh-token`,
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
