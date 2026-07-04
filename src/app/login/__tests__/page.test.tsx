import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../page";

const signIn = vi.fn().mockResolvedValue({ success: true });

vi.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({
    signIn,
    signUp: vi.fn(),
    isLoading: false,
  }),
}));

afterEach(() => {
  cleanup();
  signIn.mockClear();
});

test("renders the login heading", () => {
  render(<LoginPage />);
  expect(screen.getByRole("heading", { name: "Welcome back" })).toBeDefined();
});

test("renders email and password fields", () => {
  render(<LoginPage />);

  const email = screen.getByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Password") as HTMLInputElement;

  expect(email).toBeDefined();
  expect(email.type).toBe("email");
  expect(password).toBeDefined();
  expect(password.type).toBe("password");
});

test("renders a sign in submit button", () => {
  render(<LoginPage />);
  expect(screen.getByRole("button", { name: "Sign In" })).toBeDefined();
});

test("has a link to the sign up page", () => {
  render(<LoginPage />);
  const link = screen.getByRole("link", { name: "Sign up" }) as HTMLAnchorElement;
  expect(link.getAttribute("href")).toBe("/signup");
});

test("submits the entered email and password", async () => {
  render(<LoginPage />);

  await userEvent.type(screen.getByLabelText("Email"), "user@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "secret123");
  await userEvent.click(screen.getByRole("button", { name: "Sign In" }));

  expect(signIn).toHaveBeenCalledWith("user@example.com", "secret123");
});
