import { SpinnerDotted } from "spinners-react";
import tw from "twin.macro";

const FullScreenLoader = () => {
	return (
		<Wrapper>
			<SpinnerDotted size={70} thickness={100} speed={100} color="#262D33" />
		</Wrapper>
	);
};

const Wrapper = tw.div`flex w-full h-screen items-center justify-center bg-white`;

export default FullScreenLoader;
