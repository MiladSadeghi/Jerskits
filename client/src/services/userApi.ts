import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from ".";
import { IGetUserResponse } from "../shared/types/User.types";

const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getUser: build.query<IGetUserResponse, void>({
			query() {
				return {
					url: "/user",
				};
			},
		}),
	}),
});

export const { useGetUserQuery } = userApi;

export default userApi;
