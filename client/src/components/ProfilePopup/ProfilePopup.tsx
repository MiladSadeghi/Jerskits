import tw, { styled } from "twin.macro";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import ProfileLinks from "../../utils/profile-links";
import { useSignOutMutation } from "../../App/feature/auth/authSliceApi";

type Props = {
	name: string;
	isShow: boolean;
	myPropRef: React.RefObject<HTMLDivElement>;
};

function ProfilePopup({ name, isShow, myPropRef }: Props) {
	const [signOut] = useSignOutMutation();

	return (
		<Wrapper $isShow={isShow} ref={myPropRef}>
			<header className="flex items-center">
				<div className="flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full">
					<img src="/blank-profile-picture.png" className="w-10 h-10 " />
				</div>
				<h1 className="ml-5 font-bold capitalize text-primary-black text-text-xl">
					Hi, {name}
				</h1>
			</header>
			<main className="flex flex-col space-y-7">
				{ProfileLinks.map((link, index) => (
					<Link to={link.link} key={index}>
						{link.title}
					</Link>
				))}
				<button
					className="font-bold text-lg leading-[150%] text-primary-black text-left"
					onClick={() => signOut()}
				>
					Logout
				</button>
			</main>
		</Wrapper>
	);
}

const Wrapper = styled.div<{ $isShow?: boolean }>`
	${tw`absolute right-0 top-[90px] bg-white shadow-md w-80 p-7 space-y-7 border border-neutral-soft-grey`}
	${({ $isShow }) => ($isShow ? tw`block` : tw`hidden`)}
`;
const Link = tw(RouterLink)`
	font-bold text-lg leading-[150%] text-primary-black
`;

export default ProfilePopup;
