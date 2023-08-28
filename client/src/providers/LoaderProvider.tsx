import React, { useState } from "react";
import LoaderContext from "./LoaderContext";
import { LoaderContextType } from "../shared/types/Loader.types";

interface LoaderProviderProps {
	children: React.ReactNode;
}

const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
	const [fullScreenLoader, setFullScreenLoader] = useState(true);
	const [navbarLoader, setNavbarLoader] = useState<boolean>(true);

	const showFullScreenLoader = () => {
		setFullScreenLoader(true);
	};

	const hideFullScreenLoader = () => {
		setFullScreenLoader(false);
	};

	const showNavbarLoader = () => setNavbarLoader(true);
	const hideNavbarLoader = () => setNavbarLoader(false);

	const contextValue: LoaderContextType = {
		fullScreenLoader,
		navbarLoader,
		showFullScreenLoader,
		hideFullScreenLoader,
		showNavbarLoader,
		hideNavbarLoader,
	};

	return (
		<LoaderContext.Provider value={contextValue}>
			{children}
		</LoaderContext.Provider>
	);
};

export default LoaderProvider;
