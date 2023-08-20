import React, { useState } from "react";
import LoaderContext from "./LoaderContext";
import { LoaderContextType } from "../shared/types/Loader.types";

interface LoaderProviderProps {
	children: React.ReactNode;
}

const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	const showLoader = () => {
		setIsLoading(true);
	};

	const hideLoader = () => {
		setIsLoading(false);
	};

	const contextValue: LoaderContextType = {
		isLoading,
		showLoader,
		hideLoader,
	};

	return (
		<LoaderContext.Provider value={contextValue}>
			{children}
		</LoaderContext.Provider>
	);
};

export default LoaderProvider;
