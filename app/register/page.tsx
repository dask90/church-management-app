"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member" as "admin" | "pastor" | "staff" | "member",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!isChecked) {
      setError("You must agree to the Terms and Conditions and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        formData.role
      );

      if (success) {
        router.push("/dashboard");
      } else {
        setError("Email already exists. Please use a different email.");
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center flex-1 px-4 py-12 bg-black sm:px-6 lg:px-8">
        <div className="flex flex-col flex-1 w-full max-w-4xl lg:w-1/2">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm text-gray-300 transition-colors hover:text-amber-300"
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
                  Back to login
                </Link>
              </div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-white text-title-sm sm:text-title-md">
                  Sign Up
                </h1>
                <p className="text-sm text-gray-300">
                  Enter your information to create your church management
                  account!
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="px-4 py-3 mb-4 text-red-400 border border-red-800 rounded-lg bg-red-900/20">
                  {error}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-white">
                        First Name <span className="text-amber-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-white">
                        Last Name <span className="text-amber-300">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Email <span className="text-amber-300">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Role <span className="text-amber-300">*</span>
                    </label>
                    <select
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                    >
                      <option value="pastor">Pastor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Password <span className="text-amber-300">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
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

                  {/* Confirm Password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">
                      Confirm Password <span className="text-amber-300">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                    />
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="w-4 h-4 bg-gray-800 border-gray-700 rounded text-amber-300 focus:ring-amber-300 focus:ring-2"
                    />
                    <span className="block font-normal text-gray-300 text-theme-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-amber-300 hover:text-amber-200"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-amber-300 hover:text-amber-200"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-black transition rounded-lg bg-amber-300 shadow-theme-xs hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-300 sm:text-start">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-amber-300 hover:text-amber-200"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side - Image Placeholder (50% width) */}
      <div className="flex-1 hidden bg-gray-800 lg:block">
        {/* Add your image here - you can use an img tag or background image */}
        {/* Example with img tag: */}
        <img
          src="/images/pastor.jpg"
          alt="Church"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
