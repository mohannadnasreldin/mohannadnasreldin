import React from "react";
import { render, screen } from "@testing-library/react";
import { FluidScrollProvider } from "../context/FluidScrollContext";
import Footer from "../components/Footer";

test("renders Footer with year", () => {
  render(
    <FluidScrollProvider>
      <Footer year={2025} />
    </FluidScrollProvider>
  );
  expect(screen.getByText(/2025/i)).toBeInTheDocument();
});
