import {
  BaseQueryFn,
  FetchArgs,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../api/apiSlice";
import { TSignUpResponseError, TSignUpRequest } from "./authSlice.types";
import { setToken } from "./authSlice";
import { toast } from "react-hot-toast";

export const authSliceApi = createApi({
  reducerPath: "authSliceApi",
  baseQuery: baseQueryWithAuth as BaseQueryFn<
    FetchArgs,
    unknown,
    TSignUpResponseError
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
  }),
});

export const { useSignUpMutation } = authSliceApi;
