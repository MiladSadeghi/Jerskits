import { screen, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import user from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/test-utils";
import { MemoryRouter } from "react-router-dom";

describe("Sign Up", () => {
  test("render correctly", () => {
    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const SignUpElement = screen.getByRole("heading", {
      name: /Register Account/i,
    });
    expect(SignUpElement).toBeInTheDocument();
  });

  test("the form working correctly", async () => {
    user.setup();
    renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /CREATE/i });
    await user.type(emailInput, "testmail@gmail.com");
    await user.click(submitButton);
    const passwordErrorElement = screen.getAllByText(/password is required/i);
    expect(passwordErrorElement.length).toBeGreaterThan(1);
  });

  test("fetching & receive a accessToken after clicking creating account button", async () => {
    user.setup();
    const component = renderWithProviders(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
      {
        preloadedState: { auth: { accessToken: null } },
      }
    );

    const emailInput = screen.getByLabelText(/email/i);
    const fullNameInput = screen.getByLabelText(/full name/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(
      /^confirmation password$/i
    );
    const acceptTermsInput = screen.getByTestId("accept-terms");

    const submitButtonElement = screen.getByRole("button", { name: /create/i });

    await user.type(emailInput, "miladsadeghi2323@gmail.com");
    await user.type(fullNameInput, "milad sadeghi");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");
    await user.click(acceptTermsInput);

    await user.click(submitButtonElement);
    await waitFor(() =>
      expect(component.store.getState().auth.accessToken).toBe(
        "fakeAccessToken"
      )
    );
  });
});
