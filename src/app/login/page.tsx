import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in to your account to continue
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <SignInForm />
        </div>

        <p className="text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
