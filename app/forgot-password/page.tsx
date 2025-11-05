// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<
    "email" | "otp" | "new-password" | "success"
  >("email");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const usersJson = localStorage.getItem("church-users");
      if (!usersJson) {
        setError("No user found with this email");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(usersJson);
      const userExists = users.find((u: any) => u.email === email);

      if (!userExists) {
        setError("No user found with this email");
        setIsLoading(false);
        return;
      }

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);

      const otpData = {
        otp: newOtp,
        email: email,
        expiresAt: Date.now() + 5 * 60 * 1000,
      };
      localStorage.setItem(`church-otp-${email}`, JSON.stringify(otpData));

      alert(`Your OTP is ${newOtp}. It is valid for 5 minutes.`);

      setStep("otp");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const storedOtpData = localStorage.getItem(`church-otp-${email}`);
      if (!storedOtpData) {
        setError("OTP expired or not found. Please request a new one.");
        setIsLoading(false);
        return;
      }

      const otpData = JSON.parse(storedOtpData);

      if (Date.now() > otpData.expiresAt) {
        setError("OTP has expired. Please request a new one.");
        localStorage.removeItem(`church-otp-${email}`);
        setIsLoading(false);
        return;
      }

      if (otp !== otpData.otp) {
        setError("Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      setStep("new-password");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const usersJson = localStorage.getItem("church-users");
      if (!usersJson) {
        setError("User not found");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(usersJson);
      const userIndex = users.findIndex((u: any) => u.email === email);

      if (userIndex === -1) {
        setError("User not found");
        setIsLoading(false);
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("church-users", JSON.stringify(users));

      localStorage.removeItem(`church-otp-${email}`);

      setStep("success");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center flex-1 px-4 py-12 bg-black sm:px-6 lg:px-8">
        <div className="flex flex-col flex-1 w-full max-w-4xl lg:w-1/2">
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

          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-white text-title-sm sm:text-title-md">
                  {step === "email"
                    ? "Reset Your Password"
                    : step === "otp"
                    ? "Enter Verification Code"
                    : step === "new-password"
                    ? "Set New Password"
                    : "Password Reset Success!"}
                </h1>
                <p className="text-sm text-gray-300">
                  {step === "email"
                    ? "Enter your email to receive a one-time password"
                    : step === "otp"
                    ? "Check your email for the verification code"
                    : step === "new-password"
                    ? "Enter your new password below"
                    : "Your password has been reset successfully!"}
                </p>
                {step === "otp" && generatedOtp && (
                  <div className="p-3 mt-3 border rounded-lg border-amber-800 bg-amber-900/20">
                    <p className="text-sm text-center text-amber-300">
                      <strong>OTP:</strong> {generatedOtp}
                    </p>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="px-4 py-3 mb-4 text-red-400 border border-red-800 rounded-lg bg-red-900/20">
                  {error}
                </div>
              )}

              {step === "email" && (
                <form onSubmit={handleSendOtp}>
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
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-sm font-medium text-black transition-colors rounded-lg bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {step === "otp" && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Verification Code{" "}
                        <span className="text-amber-300">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 text-sm text-2xl tracking-widest text-center text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                      />
                      <p className="mt-2 text-xs text-center text-gray-400">
                        Enter the 6-digit code sent to your email
                      </p>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-sm font-medium text-black transition-colors rounded-lg bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {step === "new-password" && (
                <form onSubmit={handleSetNewPassword}>
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        New Password <span className="text-amber-300">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
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

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Confirm New Password{" "}
                        <span className="text-amber-300">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300"
                        />
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showConfirmPassword ? (
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

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-sm font-medium text-black transition-colors rounded-lg bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Updating..." : "Reset Password"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="space-y-6 text-center">
                  <div className="mb-4 text-6xl text-green-400">✓</div>
                  <h3 className="text-lg font-medium text-white">
                    Password Reset Successful!
                  </h3>
                  <p className="text-gray-300">
                    Your password has been updated successfully.
                  </p>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div className="h-2 rounded-full bg-amber-300 animate-pulse"></div>
                  </div>
                  <div className="pt-4">
                    <Link
                      href="/login"
                      className="inline-flex items-center font-medium text-amber-300 hover:text-amber-200"
                    >
                      Go to Login immediately
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-300">
                  Remember your password? {""}
                  <Link
                    href="/login"
                    className="text-amber-300 hover:text-amber-200"
                  >
                    Back to Login
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
