import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../page";

const signIn = vi.fn();

vi.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    signIn,
    signUp: vi.fn(),
    isLoading: false,
  }),
}));

afterEach(() => {
  cleanup();
  signIn.mockReset();
});

test("renders the welcome heading", () => {
  render(<LoginPage />);

  const heading = screen.getByRole("heading", { name: "Welcome back" });
  expect(heading).toBeDefined();
});

test("renders email and password fields with correct types", () => {
  render(<LoginPage />);

  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Password") as HTMLInputElement;

  expect(email.type).toBe("email");
  expect(password.type).toBe("password");
});

test("renders a submit button", () => {
  render(<LoginPage />);

  const button = screen.getByRole("button", { name: "Sign In" });
  expect(button).toBeDefined();
});

test("renders a link to the sign up page", () => {
  render(<LoginPage />);

  const link = screen.getByRole("link", { name: "Sign up" }) as HTMLAnchorElement;
  expect(link).toBeDefined();
  expect(link.getAttribute("href")).toBe("/signup");
});

test("calls signIn with the entered credentials on submit", async () => {
  signIn.mockResolvedValue({ success: true });

  render(<LoginPage />);

  await userEvent.type(screen.getByLabelText("Email"), "user@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "password123");
  await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

  expect(signIn).toHaveBeenCalledWith("user@example.com", "password123");
});
