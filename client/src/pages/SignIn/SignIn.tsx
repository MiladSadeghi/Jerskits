import { Link, useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { styled } from "twin.macro";
import { ISignInForm } from "./SignIn.types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignInSchema from "./SignIn.schema";
import { toast } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
import { css } from "twin.macro";
import { useSignInMutation } from "../../services";
import { useEffect } from "react";

function SignIn() {
	const navigate = useNavigate();
	window.document.title = "Jerskits - Sign In";
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignInForm>({
		resolver: yupResolver(SignInSchema),
	});

	const [signIn, { isLoading, isSuccess }] = useSignInMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success(
				"Awesome! You're all signed up. Taking you back to the home page now...",
				{
					duration: 2900,
				}
			);
			setTimeout(() => {
				navigate("/", { replace: true });
			}, 3000);
		}
	}, [isSuccess, navigate]);

	const signInHandler = async (data: ISignInForm) => {
		await signIn({
			email: data.email,
			password: data.password,
		});
	};

	return (
		<div className="max-w-[400px] w-full">
			<div className="space-y-5 mb-7">
				<Link to="/">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11 6.5L5.5 12M5.5 12L11 17.5M5.5 12H20"
							stroke="#262D33"
							strokeWidth="1.2"
						/>
					</svg>
				</Link>
				<h2 className="text-3xl font-bold text-text-3xl leading-[150%]">
					Welcome to Jerskits
				</h2>
				<p className="text-lg text-neutral-dark-grey leading-[150%]">
					Login to your account
				</p>
			</div>

			<div>
				<form className="space-y-7" onSubmit={handleSubmit(signInHandler)}>
					<div className="space-y-[8px]">
						<FormLabel htmlFor="email">Email</FormLabel>
						<FormInput
							type="text"
							id="email"
							autoComplete="off"
							{...register("email", { required: true })}
						/>
						<FormError>{errors.email && errors.email.message}</FormError>
					</div>
					<div className="space-y-[8px]">
						<FormLabel htmlFor="password">Password</FormLabel>
						<FormInput
							type="password"
							id="password"
							autoComplete="new-password1"
							{...register("password", { required: true })}
						/>
						<FormError>{errors.password && errors.password.message}</FormError>
					</div>
					<SubmitButton type="submit" disabled={isLoading}>
						{isLoading ? (
							<SpinnerCircular
								size={45}
								thickness={117}
								speed={132}
								color="rgba(255, 255, 255, 1)"
								secondaryColor="rgba(38, 45, 51, 1)"
								className="m-auto"
							/>
						) : (
							"LOGIN"
						)}
					</SubmitButton>
				</form>

				<p className="text-neutral-dark-grey text-text-sm mt-7">
					Don’t have an account?{" "}
					<Link
						to="/sign-up"
						className="text-sm font-medium text-primary-black"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}

const FormLabel = tw.label`text-primary-black font-normal`;
const FormInput = styled.input`
	${tw`w-full h-12 px-5 py-4 border border-neutral-grey `}
	${css`
		&:focus {
			border-color: #262d33;
			box-shadow: none;
		}
	`}
`;
const FormError = tw.p`text-text-sm text-red-500`;
const SubmitButton = styled.button`
	${tw`w-full font-bold text-white h-14 bg-primary-black disabled:opacity-50`}
	${css`
		&:disabled {
			opacity: 0.7;
		}
	`}
`;

export default SignIn;
