import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../api/apiSlice.ts";
import { Option } from "../../../pages/Profile/components/Edit/Edit.types.ts";

type LocationResponse = {
	error: string;
	country: Option[];
	state: Option[];
	city: Option[];
};
export const locationSliceApi = createApi({
	reducerPath: "locationSliceApi",
	baseQuery: baseQueryWithAuth,
	endpoints: (build) => ({
		getLocation: build.query<LocationResponse, string>({
			query(url) {
				return {
					url: url,
					method: "GET",
				};
			},
		}),
	}),
});

export const { useLazyGetLocationQuery } = locationSliceApi;
