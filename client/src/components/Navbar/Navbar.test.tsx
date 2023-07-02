import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Navbar", () => {
  test("elements render correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const homeElement = screen.getByAltText("Home");
    const menElement = screen.getByRole("link", { name: "Men" });
    const womanElement = screen.getByRole("link", { name: "Woman" });
    const kidsElement = screen.getByRole("link", { name: "Kids" });
    const brandsElement = screen.getByRole("link", { name: "Brands" });
    const searchElement = screen.getByRole("button", {
      name: "search",
    });
    const bagListElement = screen.getByRole("button", {
      name: "bag",
    });
    const favoriteListElement = screen.getByRole("button", {
      name: "favorite",
    });
    const signInElement = screen.getByRole("link", {
      name: "Sign In",
    });

    expect(homeElement).toBeInTheDocument();
    expect(menElement).toBeInTheDocument();
    expect(womanElement).toBeInTheDocument();
    expect(kidsElement).toBeInTheDocument();
    expect(brandsElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
    expect(bagListElement).toBeInTheDocument();
    expect(favoriteListElement).toBeInTheDocument();
    expect(signInElement).toBeInTheDocument();
  });

  test("links render correctly", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    const homeLink = screen.getByAltText("Home");
    const menLink = screen.getByRole("link", { name: "Men" });
    const womanLink = screen.getByRole("link", { name: "Woman" });
    const kidsLink = screen.getByRole("link", { name: "Kids" });
    const brandsLink = screen.getByRole("link", { name: "Brands" });
    const signInLink = screen.getByRole("link", { name: "Sign In" });

    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
    expect(menLink.closest("a")).toHaveAttribute("href", "/category/mens");
    expect(womanLink.closest("a")).toHaveAttribute("href", "/category/womans");
    expect(kidsLink.closest("a")).toHaveAttribute("href", "/category/kids");
    expect(brandsLink.closest("a")).toHaveAttribute("href", "/category/brands");
    expect(signInLink.closest("a")).toHaveAttribute("href", "/sign-in");
  });
});
