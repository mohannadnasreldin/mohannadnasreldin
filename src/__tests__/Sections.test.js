import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Services from '../components/Services';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

jest.mock('gsap', () => ({ gsap: { registerPlugin: jest.fn(), fromTo: jest.fn() } }));
jest.mock('gsap/ScrollTrigger', () => ({}));
test('renders Services with heading', () => {
  render(<Services id="services" />);
  expect(screen.getByRole('heading', { name: /Services/i })).toBeInTheDocument();
});

test('renders About with heading', () => {
  render(<About id="about" />);
  expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
});

test('renders Experience with heading', () => {
  render(<Experience id="experience" />);
  expect(screen.getByRole('heading', { name: /Experience/i })).toBeInTheDocument();
});

test('renders Projects and shows cards', () => {
  render(<Projects id="projects" />);
  expect(screen.getByRole('heading', { name: /Projects/i })).toBeInTheDocument();
});

test('renders Skills with heading', () => {
  render(<Skills id="skills" />);
  expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
});

test('renders Contact with heading', () => {
  render(<Contact id="contact" />);
  expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
});
