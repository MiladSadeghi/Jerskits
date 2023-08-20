import { ReactNode, ReactElement } from "react";
import { IProfile } from "./Profile.types";

export interface IAuthenticationLayoutProps {
	children: ReactNode;
}

export interface ICard {
	background: string;
	icon: ReactElement;
	title: string;
	desc: string;
}

export interface IAuthSlice {
	isAuthenticated: boolean;
}

export type TSignUpRequest = {
	email: string;
	fullName: string;
	password: string;
};

export type TAuthResponseError = {
	status: number | string;
	data: {
		error: boolean;
		message: string;
		field: [string];
	};
};

export type TSignInRequest = {
	email: string;
	password: string;
};

export type TAuthResponse = {
	error: boolean;
	message: string;
};

export type TDecodedJWT = IProfile;
