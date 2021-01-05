import { render, screen } from '@testing-library/react';
import App_orig from './App_orig';

test('renders learn react link', () => {
  render(<App_orig />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
