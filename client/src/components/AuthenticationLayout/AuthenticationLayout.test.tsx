import { render, screen } from "@testing-library/react";
import AuthenticationLayout from "./AuthenticationLayout";
import { SignIn } from "../../pages";

describe("Authentication Layout", () => {
  test("children props work", () => {
    render(<AuthenticationLayout children={<SignIn />} />);
    const signInElement = screen.getByText("SignIn");
    expect(signInElement).toBeInTheDocument();
  });
});
