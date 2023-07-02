import { render, screen } from "@testing-library/react";
import { SignIn } from "..";
import user from "@testing-library/user-event";

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
    const emailInput = screen.getByRole("textbox", { name: "email" });
    await user.type(emailInput, "test");
    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).toHaveAttribute("disabled", true);
  });
});
