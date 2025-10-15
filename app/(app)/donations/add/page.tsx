"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDonations } from "@/contexts/DonationsContext";
import { useMembers } from "@/contexts/MembersContext";
import { useAuth } from "@/contexts/AuthContext";
import { DONATION_TYPES, PAYMENT_METHODS } from "@/types";
import Link from "next/link";

export default function AddDonation() {
  const { members } = useMembers();
  const { user } = useAuth();
  const { addDonation } = useDonations();
  const router = useRouter();

  const [formData, setFormData] = useState({
    memberId: "",
    amount: "",
    type: "tithe" as const,
    date: new Date().toISOString().split("T")[0],
    method: "cash" as const,
    checkNumber: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.memberId) {
        setError("Please select a member");
        return;
      }

      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        setError("Please enter a valid amount");
        return;
      }

      if (formData.method === "check" && !formData.checkNumber) {
        setError("Please enter check number for check payments");
        return;
      }

      // Add donation
      addDonation({
        memberId: formData.memberId,
        amount: parseFloat(formData.amount),
        type: formData.type,
        date: new Date(formData.date),
        method: formData.method,
        checkNumber: formData.checkNumber || undefined,
        description: formData.description || undefined,
        recordedBy: user?.id || "1",
        status: "completed",
      });

      // Reset form
      setFormData({
        memberId: "",
        amount: "",
        type: "tithe",
        date: new Date().toISOString().split("T")[0],
        method: "cash",
        checkNumber: "",
        description: "",
      });

      // Redirect to donations list
      router.push("/donations");
    } catch (error) {
      console.error("Error recording donation:", error);
      setError("Failed to record donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/donations"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
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
          Back to Donations
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Record Donation</h1>
          <p className="mt-2 text-gray-600">
            Record tithes, offerings, and other donations
          </p>
        </div>

        {error && (
          <div className="px-4 py-3 mb-6 text-red-600 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border rounded-lg shadow-sm border-slate-900"
        >
          <div className="space-y-6">
            {/* Donor Information */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Donor Information
              </h3>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Member <span className="text-red-500">*</span>
                </label>
                <select
                  name="memberId"
                  required
                  value={formData.memberId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                >
                  <option value="">Select a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName} - {member.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Donation Details */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Donation Details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      required
                      min="0.01"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      className="block w-full py-2 pr-12 border border-gray-300 rounded-md pl-7 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Donation Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  >
                    {DONATION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="method"
                    required
                    value={formData.method}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.method === "check" && (
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Check Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="checkNumber"
                      required={formData.method === "check"}
                      value={formData.checkNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                      placeholder="Enter check number"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                    placeholder="Additional notes about this donation..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-3">
            <Link
              href="/donations"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium border border-transparent rounded-md text-amber-300 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Recording Donation..." : "Record Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
