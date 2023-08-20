import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./App/store";
import { Toaster } from "react-hot-toast";
import LoaderProvider from "./providers/LoaderProvider";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Toaster />
				<LoaderProvider>
					<App />
				</LoaderProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
