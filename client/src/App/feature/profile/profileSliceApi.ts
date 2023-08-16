import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/apiSlice";
import { IProfile, TGetProfileResponse } from "./profileSlice.types";
import { toast } from "react-hot-toast";
import { setProfile } from "./profileSlice";

export const profileSliceApi = createApi({
	reducerPath: "profileSliceApi",
	baseQuery: baseQueryWithReauth,
	refetchOnMountOrArgChange: true,
	endpoints: (build) => ({
		getUserProfile: build.query<{ profile: TGetProfileResponse }, void>({
			query() {
				return {
					url: "/profile",
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setProfile(data.profile));
				} catch (error: unknown) {
					if (typeof error === "object" && error !== null) {
						const err = error as Record<string, unknown>;
						if (err.error && typeof err.error === "object") {
							const errStatus = err.error as Record<string, unknown>;
							if (errStatus.status === "FETCH_ERROR") {
								toast.error("Cant login, try again later or refresh the page");
							} else if (errStatus.status === 404) {
								toast.error("cant get your profile!, please refresh the page");
							}
						}
					}
				}
			},
		}),
		updateUserProfile: build.mutation<{ profile: IProfile }, FormData>({
			query(profile) {
				return {
					url: "/profile",
					method: "PATCH",
					body: profile,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setProfile(data.profile));
				} catch (error: unknown) {
					if (typeof error === "object" && error !== null) {
						const err = error as Record<string, unknown>;
						toast.error(String(err.message));
					}
				}
			},
		}),
	}),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
	profileSliceApi;
