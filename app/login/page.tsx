"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form (50% width) */}
      <div className="flex items-center justify-center flex-1 px-4 py-12 bg-black sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-100 transition-colors hover:text-amber-300"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className="flex flex-col justify-center flex-1 w-full">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-white text-title-sm sm:text-title-md">
                  Sign In
                </h1>
                <p className="text-sm text-gray-300">
                  Enter your email and password to access the church management
                  system
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="px-4 py-3 mb-4 text-red-400 border border-red-800 rounded-lg bg-red-900/20">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Email <span className="text-amber-300">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@gmail.com"
                      className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Password <span className="text-amber-300">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-amber-300 focus:ring-amber-300 focus:ring-2"
                      />
                      <span className="block font-normal text-gray-300 text-theme-sm">
                        Keep me logged in
                      </span>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-amber-300 hover:text-amber-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-4 py-3 text-sm font-medium text-black transition-colors rounded-lg bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </div>
              </form>

              {/* <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-300 sm:text-start">
                  Don&apos;t have an account? {""}
                  <Link
                    href="/register"
                    className="text-amber-300 hover:text-amber-200"
                  >
                    Sign Up
                  </Link>
                </p>
              </div> */}

              {/* Demo credentials */}
              <div className="p-4 mt-4 border rounded-lg border-amber-800 bg-amber-900/20">
                <p className="text-sm text-center text-amber-300">
                  <strong>Demo credentials:</strong>
                  <br />
                  Email: admin@church.com
                  <br />
                  Password: password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image Placeholder (50% width) */}
      <div className="flex-1 hidden bg-gray-800 lg:block">
        <img
          src="/images/pastor.jpg"
          alt="Church"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
