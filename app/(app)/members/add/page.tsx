"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMembers } from "@/contexts/MembersContext";
import { BRANCHES } from "@/types";
import Link from "next/link";

export default function AddMember() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "Main Branch",
    address: "",
    birthDate: "",
    maritalStatus: "" as "single" | "married" | "divorced" | "widowed" | "",
    occupation: "",
    groups: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { addMember, members } = useMembers();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "select-multiple" && e.target instanceof HTMLSelectElement) {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prev) => ({ ...prev, [name]: selectedOptions }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (members.find((m) => m.email === formData.email)) {
        setError("A member with this email already exists");
        return;
      }

      // Add the new member
      addMember({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        branch: formData.branch,
        address: formData.address || undefined,
        birthDate: formData.birthDate
          ? new Date(formData.birthDate)
          : undefined,
        maritalStatus: formData.maritalStatus || undefined,
        occupation: formData.occupation || undefined,
        groups: formData.groups,
        familyMembers: [],
        attendance: [],
      });

      // Redirect to members list
      router.push("/members");
    } catch (error) {
      setError("Failed to add member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/members"
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
          Back to Members
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Member</h1>
          <p className="mt-1 text-sm text-gray-600">
            Add a new member to your church database
          </p>
        </div>

        {error && (
          <div className="px-3 py-2 mb-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border rounded-lg shadow-sm border-slate-900"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Personal Information */}
            <div className="md:col-span-4">
              <h3 className="mb-3 font-bold text-gray-900 text-md">
                Personal Information
              </h3>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter occupation"
              />
            </div>

            {/* Contact Information */}
            <div className="mt-1 md:col-span-4">
              <h3 className="mb-1 font-bold text-gray-900 text-md">
                Contact Information
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                required
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full address"
              />
            </div>

            {/* Church Information */}
            <div className="mt-1 md:col-span-4">
              <h3 className="font-bold text-gray-900 text-md">
                Church Information
              </h3>
            </div>

            <div className="md:col-span-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Ministry Groups
              </label>
              <select
                name="groups"
                multiple
                value={formData.groups}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                size={1}
              >
                <option value="Worship Team">Worship Team</option>
                <option value="Youth Ministry">Youth Ministry</option>
                <option value="Prayer Group">Prayer Group</option>
                <option value="Ushers">Ushers</option>
                <option value="Sunday School">Sunday School</option>
                <option value="Mens Fellowship">Men&apos;s Fellowship</option>
                <option value="Womens Ministry">Women&apos;s Ministry</option>
                <option value="Outreach Team">Outreach Team</option>
                <option value="Children Ministry">Children Ministry</option>
                <option value="Media Team">Media Team</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Hold Ctrl/Cmd to select multiple groups
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Link
              href="/members"
              className="px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium border rounded-md text-amber-300 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Adding Member..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
