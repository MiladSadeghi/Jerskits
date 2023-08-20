import tw, { styled } from "twin.macro";
import { Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";
import ProfileLinks from "../../utils/profile-links";
import { useSignOutMutation } from "../../services";
import { useAppSelector } from "../../App/hooks";

type Props = {
	isShow: boolean;
};

const ProfilePopup = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { isShow } = props;
	const [signOut] = useSignOutMutation();
	const profile = useAppSelector((state) => state.profile);

	return (
		<Wrapper $isShow={isShow} ref={ref}>
			<header className="flex items-center">
				<div className="flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full">
					<img src="/images/blank-profile-picture.png" className="w-10 h-10 " />
				</div>
				<h1 className="ml-5 font-bold capitalize text-primary-black text-text-xl">
					Hi, {profile.firstName ? profile.firstName : profile.fullName}
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
});

const Wrapper = styled.div<{ $isShow?: boolean }>`
	${tw`absolute right-0 top-[90px] bg-white shadow-md w-80 p-7 space-y-7 border border-neutral-soft-grey`}
	${({ $isShow }) => ($isShow ? tw`block` : tw`hidden`)}
`;
const Link = tw(RouterLink)`
	font-bold text-lg leading-[150%] text-primary-black
`;

export default ProfilePopup;
