import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('renders Footer with year', () => {
  render(<Footer year={2025} />);
  expect(screen.getByText(/2025/i)).toBeInTheDocument();
});
