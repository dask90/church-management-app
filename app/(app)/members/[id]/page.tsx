"use client";

import { useParams, useRouter } from "next/navigation";
import { useMembers } from "@/contexts/MembersContext";
import Link from "next/link";
import { useState } from "react";

export default function MemberDetail() {
  const params = useParams();
  const router = useRouter();
  const { members, deleteMember } = useMembers();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const memberId = params.id as string;
  const member = members.find((m) => m.id === memberId);

  if (!member) {
    return (
      <div className="p-6">
        <div className="py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Member Not Found
          </h1>
          <p className="mb-6 text-gray-600">
            The member you're looking for doesn't exist.
          </p>
          <Link
            href="/members"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMember(memberId);
    router.push("/members");
  };

  const calculateAge = (birthDate?: Date) => {
    if (!birthDate) return null;
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Not specified";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/members"
          className="inline-flex items-center mb-4 text-sm text-gray-500 hover:text-gray-700"
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

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {member.firstName} {member.lastName}
            </h1>
            <p className="mt-2 text-gray-600">
              Member since {formatDate(member.joinDate)}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/members/edit/${member.id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 mx-4 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Delete Member
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete {member.firstName}{" "}
              {member.lastName}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <p className="text-gray-900">
                    {member.firstName} {member.lastName}
                  </p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Birth Date
                  </label>
                  <p className="text-gray-900">
                    {formatDate(member.birthDate)}
                    {member.birthDate &&
                      ` (${calculateAge(member.birthDate)} years old)`}
                  </p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <p className="text-gray-900 capitalize">
                    {member.maritalStatus || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  <p className="text-gray-900">
                    {member.occupation || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Contact Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{member.email}</p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {member.phone || "Not specified"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <p className="text-gray-900">
                    {member.address || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Church Information Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Church Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Branch
                  </label>
                  <p className="text-gray-900">{member.branch}</p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Join Date
                  </label>
                  <p className="text-gray-900">{formatDate(member.joinDate)}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Ministry Groups
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {member.groups.length > 0 ? (
                      member.groups.map((group) => (
                        <span
                          key={group}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
                        >
                          {group}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        Not assigned to any groups
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Member Summary Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Member Summary
              </h3>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-2xl font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {member.firstName.charAt(0)}
                  {member.lastName.charAt(0)}
                </div>
                <h4 className="text-lg font-medium text-gray-900">
                  {member.firstName} {member.lastName}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {member.occupation || "No occupation specified"}
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Branch:</span>
                    <span className="font-medium">{member.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member Since:</span>
                    <span className="font-medium">
                      {new Date(member.joinDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full px-4 py-2 text-sm text-left text-blue-600 rounded-md hover:bg-blue-50">
                Record Attendance
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-blue-600 rounded-md hover:bg-blue-50">
                Add Family Member
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-blue-600 rounded-md hover:bg-blue-50">
                Record Donation
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-blue-600 rounded-md hover:bg-blue-50">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
