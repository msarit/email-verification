import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expected form fields', () => {
  render(<App />);

  const emailVerificationPrompt = "Verify your email by entering the code we just emailed to you";

  const nameLabel = screen.getByLabelText(/Name/i);
  const emailLabel = screen.getByLabelText(/Email/i);
  const prompt = screen.queryByText(`${emailVerificationPrompt}`);

  expect(nameLabel).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();
  expect(prompt).not.toBeInTheDocument();
});
