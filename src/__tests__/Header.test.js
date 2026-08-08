import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";
import { FluidScrollProvider } from "../context/FluidScrollContext";
import Header from "../components/Header";

jest.mock("@heroicons/react/24/outline", () => ({
  Bars3Icon: () => <span>Menu</span>,
  XMarkIcon: () => <span>X</span>,
  SunIcon: () => <span>Sun</span>,
  MoonIcon: () => <span>Moon</span>,
}));

const wrap = (ui) =>
  render(
    <ThemeProvider>
      <FluidScrollProvider>{ui}</FluidScrollProvider>
    </ThemeProvider>
  );

test("renders Header and toggles theme", () => {
  wrap(<Header />);
  const toggle = screen.getAllByRole("button", { name: /mode/i })[0];
  fireEvent.click(toggle);
  expect(document.documentElement.classList.contains("light")).toBe(true);
});

test("navigates to sections via onNavigate", () => {
  const handler = jest.fn();
  wrap(<Header onNavigate={handler} />);
  const link = screen.getByRole("link", { name: /Projects/i });
  fireEvent.click(link);
  expect(handler).toHaveBeenCalledWith("projects");
});
