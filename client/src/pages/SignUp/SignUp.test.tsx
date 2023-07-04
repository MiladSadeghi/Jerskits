import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import user from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../utils/test-utils";
import authSlice, { setToken } from "../../App/feature/auth/authSlice";

export const handlers = [
  rest.get("/auth/sign-up", (req, res, ctx) => {
    return res(ctx.json({ accessToken: "fakeAccessToken" }), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Sign Up", () => {
  test("render correctly", () => {
    render(<SignUp />);
    const SignUpElement = screen.getByRole("heading", {
      name: /Register Account/i,
    });
    expect(SignUpElement).toBeInTheDocument();
  });

  test("the form working correctly", async () => {
    user.setup();
    render(<SignUp />);
    const emailInput = screen.getByRole("textbox", { name: "email" });
    await user.type(emailInput, "testmail.gmail.com");
    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toHaveAttribute("disabled", true);
  });

  test("fetching & receive a accessToken after clicking creating account button", async () => {
    user.setup();
    renderWithProviders(<SignUp />, {
      preloadedState: { auth: { accessToken: null } },
    });
    const prevState = { accessToken: null };

    const emailInput = screen.getByLabelText(/email/i);
    const fullNameInput = screen.getByLabelText(/full name/i);
    const passwordInput = screen.getByTestId(/password/i);
    const confirmPasswordInput = screen.getByTestId(/confirmation password/i);
    const acceptTermsInput = screen.getByTestId("accept-terms");

    const submitButtonElement = screen.getByRole("button", { name: /create/i });

    await user.type(emailInput, "miladsadeghi2323@gmail.com");
    await user.type(fullNameInput, "milad sadeghi");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");
    await user.type(acceptTermsInput, "miladsadeghi2323@gmail.com");
    await user.click(acceptTermsInput);

    await user.click(submitButtonElement);

    expect(authSlice(prevState, setToken("fakeAccessToken"))).toEqual([
      { accessToken: "fakeAccessToken" },
    ]);
  });
});
