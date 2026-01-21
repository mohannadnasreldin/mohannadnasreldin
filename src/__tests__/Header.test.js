import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';

jest.mock('feather-icons-react', () => ({
  Menu: () => <span>Menu</span>,
  X: () => <span>X</span>,
  Sun: () => <span>Sun</span>,
  Moon: () => <span>Moon</span>,
}));

test('renders Header and toggles theme', () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
  const toggle = screen.getAllByRole('button', { name: /mode/i })[0];
  fireEvent.click(toggle);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

test('navigates to sections via onNavigate', () => {
  const handler = jest.fn();
  render(
    <ThemeProvider>
      <Header onNavigate={handler} />
    </ThemeProvider>
  );
  const link = screen.getByRole('link', { name: /Projects/i });
  fireEvent.click(link);
  expect(handler).toHaveBeenCalledWith('projects');
});
