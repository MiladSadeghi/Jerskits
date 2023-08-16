import { ReactNode, ReactElement } from "react";

export interface IAuthenticationLayoutProps {
	children: ReactNode;
}

export interface ICard {
	background: string;
	icon: ReactElement;
	title: string;
	desc: string;
}
