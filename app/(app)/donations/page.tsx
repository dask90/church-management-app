"use client";

import { useDonations } from "@/contexts/DonationsContext";
import { useMembers } from "@/contexts/MembersContext";
import { DONATION_TYPES } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function DonationsPage() {
  const { donations, deleteDonation, isLoading } = useDonations();
  const { members } = useMembers();
  const [filterType, setFilterType] = useState<string>("all");
  const [filterMethod, setFilterMethod] = useState<string>("all");

  const filteredDonations = donations.filter((donation) => {
    if (filterType !== "all" && donation.type !== filterType) return false;
    if (filterMethod !== "all" && donation.method !== filterMethod)
      return false;
    return true;
  });

  const getMemberName = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this donation record?")) {
      deleteDonation(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
          <p className="mt-2 text-gray-600">
            {isLoading
              ? "Loading..."
              : `Total ${donations.length} donation records`}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/donations/reports"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            View Reports
          </Link>
          <Link
            href="/donations/add"
            className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-900"
          >
            Record Donation
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {DONATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Method
            </label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Methods</option>
              <option value="cash">Cash</option>
              <option value="check">Check</option>
              <option value="online">Online</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterType("all");
                setFilterMethod("all");
              }}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Donations List */}
      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading donations...</p>
        </div>
      ) : filteredDonations.length > 0 ? (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Method
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => {
                  const donationType = DONATION_TYPES.find(
                    (t) => t.value === donation.type
                  );
                  return (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getMemberName(donation.memberId)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(donation.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donationType?.color || "bg-gray-100"
                          } text-gray-800`}
                        >
                          {donationType?.label || donation.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">
                        {donation.method}
                        {donation.checkNumber && ` #${donation.checkNumber}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(donation.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(donation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-lg shadow">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No donations yet
            </h3>
            <p className="mb-6 text-gray-500">
              Start recording tithes, offerings, and other donations.
            </p>
            <Link
              href="/donations/add"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Record Your First Donation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
