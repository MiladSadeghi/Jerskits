import { ICard } from "../../shared/types/Auth.types";

function Card({ icon, title, desc, background }: ICard) {
	return (
		<div className="relative z-20 h-full">
			<img
				src={background}
				className="absolute top-0 left-0 object-cover w-full h-full -z-10"
			/>
			<div className="absolute w-full h-full bg-black/60" />
			<div className="flex flex-col justify-between h-full px-20 py-24">
				<img
					className="z-10 m-auto h-fit w-fit"
					src={"/images/jerskits-white.jpg"}
				/>
				<div className="z-10 flex flex-col items-center">
					<div className="mb-5">{icon}</div>
					<h5 className="mb-5 text-2xl font-bold text-white">{title}</h5>
					<p className="text-base text-center text-neutral-grey">{desc}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
