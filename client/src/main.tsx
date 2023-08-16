import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./App/store";
import { Toaster } from "react-hot-toast";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Toaster />
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
