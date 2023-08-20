import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "./pages";
import { Profile } from "./pages";
import "swiper/css";
import Favorites from "./pages/Profile/components/Favorites";
import Orders from "./pages/Profile/components/Orders";
import Setting from "./pages/Profile/components/Setting";
import { Edit } from "./pages/Profile/components";
import { AuthenticationLayout, Layout } from "./layouts";
import { useContext, useEffect } from "react";
import LoaderContext from "./providers/LoaderContext";
import { useGetUserQuery } from "./services/userApi";
import { useAppDispatch } from "./App/hooks";
import { setProfile } from "./App/feature/profile/profileSlice";
import FullScreenLoader from "./components/FullScreenLoader/FullScreenLoader";
import { setAuthStatus } from "./App/feature/auth/authSlice";

function App() {
	const Loader = useContext(LoaderContext);
	const { data, error, isError, isSuccess, isFetching } = useGetUserQuery();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isFetching) Loader?.showLoader();
	}, [isFetching]);

	useEffect(() => {
		if (isSuccess) {
			console.log(data);
			Loader?.hideLoader();
			if (data.profile) dispatch(setProfile(data.profile));
			dispatch(setAuthStatus(true));
		}
	}, [isSuccess]);

	useEffect(() => {
		if (error) {
			Loader?.hideLoader();
			console.log(error);
		}
	}, [isError]);

	if (Loader?.isLoading) {
		return <FullScreenLoader />;
	}

	return (
		<div>
			<main>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="profile" element={<Profile />}>
							<Route path="edit" element={<Edit />} />
							<Route path="favorites" element={<Favorites />} />
							<Route path="orders" element={<Orders />} />
							<Route path="setting" element={<Setting />} />
						</Route>
					</Route>
					<Route
						path="/sign-in"
						element={<AuthenticationLayout children={<SignIn />} />}
					/>
					<Route
						path="/sign-up"
						element={<AuthenticationLayout children={<SignUp />} />}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
