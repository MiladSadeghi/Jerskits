import { render, screen, waitFor } from "@testing-library/react";
import { SignIn } from "..";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

describe("Sign In", () => {
  test("render correctly", () => {
    render(<SignIn />);
    const loginElement = screen.getByRole("heading", {
      name: /Login to your account/i,
    });
    expect(loginElement).toBeInTheDocument();
  });

  test("the form is working correctly", async () => {
    user.setup();
    render(<SignIn />);
    const emailInput = screen.getByLabelText("email");
    await user.type(emailInput, "test");
    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);
    const emailErrorElement = screen.getAllByText(/email is required/i);
    expect(emailErrorElement.length).toBeGreaterThan(1);
  });

  test("fetch access token after sign in", async () => {
    user.setup();
    const { store } = renderWithProviders(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
      {
        preloadedState: { auth: { accessToken: null } },
      }
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitButtonElement = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "miladsadeghi2323@gmail.com");
    await user.type(passwordInput, "123456");
    await user.click(submitButtonElement);

    await waitFor(() =>
      expect(store.getState().auth.accessToken).toBe("fakeAccessToken")
    );
  });
});
