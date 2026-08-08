import React from "react";
import { render, screen } from "@testing-library/react";
import { FluidScrollProvider } from "../context/FluidScrollContext";
import Services from "../components/Services";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

const wrap = (ui) => render(<FluidScrollProvider>{ui}</FluidScrollProvider>);

test("renders Services with heading", () => {
  wrap(<Services id="services" />);
  expect(screen.getByRole("heading", { name: /Services/i })).toBeInTheDocument();
});

test("renders About with heading", () => {
  wrap(<About id="about" />);
  expect(screen.getByRole("heading", { name: /About Me/i })).toBeInTheDocument();
});

test("renders Experience with heading", () => {
  wrap(<Experience id="experience" />);
  expect(screen.getByRole("heading", { name: /Experience/i })).toBeInTheDocument();
});

test("renders Projects and shows cards", () => {
  wrap(<Projects id="projects" />);
  expect(screen.getByRole("heading", { name: /Projects/i })).toBeInTheDocument();
});

test("renders Skills with heading", () => {
  wrap(<Skills id="skills" />);
  expect(screen.getByRole("heading", { name: /Skills/i })).toBeInTheDocument();
});

test("renders Contact with heading", () => {
  wrap(<Contact id="contact" />);
  expect(screen.getByRole("heading", { name: /Contact/i })).toBeInTheDocument();
});
