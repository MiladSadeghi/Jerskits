import {
	useSignUpMutation,
	useSignInMutation,
	useRefreshTokenQuery,
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
	useRefreshTokenQuery,
	useSignOutMutation,
	useLazyGetLocationQuery,
	useGetUserProfileQuery,
	useUpdateUserProfileMutation,
	baseQueryWithReauth,
	baseQueryWithAuth,
};
