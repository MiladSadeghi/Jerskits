import { render, screen } from "@testing-library/react";
import Edit from "./Edit";
import user from "@testing-library/user-event";

describe("Edit profile page", () => {
  test("render correctly", () => {
    render(<Edit />);
    const firstNameElement = screen.getByLabelText(/first name/i);
    const LastNameElement = screen.getByLabelText(/last name/i);
    const addressElement = screen.getByLabelText(/address/i);
    const postalCodeELement = screen.getByLabelText(/postal code/i);
    const cityElement = screen.getByLabelText(/city/i);
    const stateElement = screen.getByLabelText(/state/i);
    const countryElement = screen.getByLabelText(/country/i);
    const emailElement = screen.getByLabelText(/email/i);
    const phoneNumberElement = screen.getByLabelText(/phone number/i);

    expect(firstNameElement).toBeInTheDocument();
    expect(LastNameElement).toBeInTheDocument();
    expect(addressElement).toBeInTheDocument();
    expect(postalCodeELement).toBeInTheDocument();
    expect(cityElement).toBeInTheDocument();
    expect(stateElement).toBeInTheDocument();
    expect(countryElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(phoneNumberElement).toBeInTheDocument();
  });

  test("if one of the shipping fields is filled, the other field will display an error message", async () => {
    render(<Edit />);
    user.setup();
    const addressElement = screen.getByLabelText(/address/i);
    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.type(addressElement, "Every where you are");
    await user.click(submitButton);

    expect(screen.getByTestId("postal-code-error")).toBeVisible();
    expect(screen.getByTestId("city-error")).toBeVisible();
    expect(screen.getByTestId("state-error")).toBeVisible();
    expect(screen.getByTestId("country-error")).toBeVisible();
  });

  test("get user profile", async () => {
    render(<Edit />);
    const loadingAnimation = screen.getByTestId("loading-animation");
    expect(loadingAnimation).toBeInTheDocument();

    const firstNameElement = screen.getByLabelText(
      /first name/i
    ) as HTMLInputElement;
    const LastNameElement = screen.getByLabelText(
      /last name/i
    ) as HTMLInputElement;

    expect(firstNameElement.value).toBe("test");
    expect(LastNameElement.value).toBe("test2");
  });

  test("submit user profile", async () => {
    render(<Edit />);
    user.setup();
    const loadingAnimation = screen.getByTestId("loading-animation");
    expect(loadingAnimation).toBeInTheDocument();

    const firstNameElement = screen.getByLabelText(/first name/i);
    const LastNameElement = screen.getByLabelText(/last name/i);

    await user.type(firstNameElement, "test");
    await user.type(LastNameElement, "test2");

    const submitButton = screen.getByRole("button", { name: /save/i });
    await user.click(submitButton);

    expect(screen.getByText("Your profile saved successfully"));
  });
});
