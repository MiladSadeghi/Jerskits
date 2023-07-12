import {
  BaseQueryFn,
  FetchArgs,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../api/apiSlice";
import {
  TAuthResponseError,
  TDecodedJWT,
  TSignInRequest,
  TSignUpRequest,
} from "./authSlice.types";
import { setToken } from "./authSlice";
import { toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { setProfile } from "../profile/profileSlice";

export const authSliceApi = createApi({
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
        } catch (error: any) {
          toast.error(error.error.data.message);
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
        } catch (error: any) {
          const errorMessage = error.error.data.message || "Try again later...";
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
        } catch (error: any) {
          if (error?.error?.status === "FETCH_ERROR") {
            toast.error("Cant login, try again later or refresh the page");
          }
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useRefreshTokenQuery } =
  authSliceApi;
