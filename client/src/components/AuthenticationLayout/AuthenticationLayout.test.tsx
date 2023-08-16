import { screen } from "@testing-library/react";
import AuthenticationLayout from "./AuthenticationLayout";
import { SignIn } from "../../pages";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

describe("Authentication Layout", () => {
	test("children props work", () => {
		renderWithProviders(
			<MemoryRouter>
				<AuthenticationLayout children={<SignIn />} />
			</MemoryRouter>
		);
		const signInElement = screen.getByRole("heading", {
			name: /Welcome to Jerskits/i,
		});
		expect(signInElement).toBeInTheDocument();
	});
});
