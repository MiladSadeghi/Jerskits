import {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
} from "./authApi";

import { useLazyGetLocationQuery } from "./locationApi";
import {
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
} from "./profileApi";

import { baseQueryWithReauth, baseQueryWithAuth } from "./api";

export {
	useSignUpMutation,
	useSignInMutation,
	useSignOutMutation,
	useLazyGetLocationQuery,
	useUpdateUserProfileMutation,
	baseQueryWithReauth,
	baseQueryWithAuth,
	useGetUserProfileQuery,
};
