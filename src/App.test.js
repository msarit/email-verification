import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const otpPromptRegex =
  /Verify your email by entering the code we just emailed to you/i;

describe("form structure", () => {
  it("renders expected signup form fields", () => {
    render(<App />);

    const nameLabel = screen.getByLabelText(/Name/i);
    const emailLabel = screen.getByLabelText(/Email/i);
    const signupBtn = screen.getByRole("button", { name: /sign up/i });

    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });

  it("does not render OTP page", () => {
    render(<App />);

    const prompt = screen.queryByText(otpPromptRegex);

    expect(prompt).not.toBeInTheDocument();
  });
});

describe("form validations", () => {
  it("invalidates the absence of a name", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "valid@email.dev" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const error = screen.queryByText(/Some required fields are missing/i);
    const prompt = screen.queryByText(otpPromptRegex);

    expect(error).toBeInTheDocument();
    expect(prompt).not.toBeInTheDocument();
  });

  it("invalidates a too-short name", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "xx" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "hello@arit.dev" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const error = screen.queryByText(/Name is too short/i);
    const prompt = screen.queryByText(otpPromptRegex);

    expect(error).toBeInTheDocument();
    expect(prompt).not.toBeInTheDocument();
  });

  it("invalidates the absence of an email", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Valid Name" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const error = screen.queryByText(/Some required fields are missing/i);
    const prompt = screen.queryByText(otpPromptRegex);

    expect(error).toBeInTheDocument();
    expect(prompt).not.toBeInTheDocument();
  });

  it("invalidates a wrongly-formatted email", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Valid Name" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid@email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const error = screen.queryByText(/Email is invalid/i);
    const prompt = screen.queryByText(otpPromptRegex);

    expect(error).toBeInTheDocument();
    expect(prompt).not.toBeInTheDocument();
  });

  it("validates correct form inputs and renders OTP page on submit", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Valid Name" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "valid@email.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    const prompt = screen.queryByText(otpPromptRegex);
    const nameLabel = screen.queryByLabelText(/Name/i);
    const emailLabel = screen.queryByLabelText(/Email/i);
    const signupBtn = screen.queryByRole("button", { name: /sign up/i });

    expect(nameLabel).not.toBeInTheDocument();
    expect(emailLabel).not.toBeInTheDocument();
    expect(signupBtn).not.toBeInTheDocument();
    expect(prompt).toBeInTheDocument();
  });
});
