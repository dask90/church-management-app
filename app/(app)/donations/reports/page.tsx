"use client";

import { useDonations } from "@/contexts/DonationsContext";
import { useMembers } from "@/contexts/MembersContext";
import { DONATION_TYPES } from "@/types";
import Link from "next/link";

export default function DonationReports() {
  const { getDonationSummary, isLoading } = useDonations();
  const { members } = useMembers();

  const summary = getDonationSummary();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getMemberName = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
  };

  // Calculate type breakdown
  const typeBreakdown = DONATION_TYPES.map((type) => {
    const typeDonations = summary.recentDonations.filter(
      (d) => d.type === type.value
    );
    const total = typeDonations.reduce((sum, d) => sum + d.amount, 0);
    const percentage =
      summary.totalDonations > 0 ? (total / summary.totalDonations) * 100 : 0;

    return {
      type: type.label,
      amount: total,
      percentage: Math.round(percentage),
      color: type.color,
    };
  }).filter((item) => item.amount > 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donation Reports</h1>
          <p className="mt-2 text-gray-600">
            Financial summaries and giving trends
          </p>
        </div>
        <Link
          href="/donations"
          className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-900"
        >
          View All Donations
        </Link>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-gray-500"></p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Donations
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(summary.totalDonations)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Tithes
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(summary.totalTithes)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Offerings
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(summary.totalOfferings)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Pledges
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(summary.totalPledges)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Monthly Breakdown */}
            <div className="bg-white border rounded-lg shadow border-slate-900">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Monthly Breakdown
                </h3>
              </div>
              <div className="p-6">
                {summary.monthlyBreakdown.filter((m) => m.amount > 0).length >
                0 ? (
                  <div className="space-y-4">
                    {summary.monthlyBreakdown.map((month, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {month.month}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(month.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No donation data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Donation Type Breakdown */}
            <div className="bg-white border rounded-lg shadow border-slate-900">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Donation Type Breakdown
                </h3>
              </div>
              <div className="p-6">
                {typeBreakdown.length > 0 ? (
                  <div className="space-y-4">
                    {typeBreakdown.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {item.type}
                          </span>
                          <span className="text-sm text-gray-900">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{item.percentage}% of total</span>
                          <span>{formatCurrency(item.amount)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">
                      No donation type data available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white border rounded-lg shadow border-slate-900">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Donations
                </h3>
              </div>
              <div className="p-6">
                {summary.recentDonations.length > 0 ? (
                  <div className="space-y-4">
                    {summary.recentDonations.map((donation) => {
                      const donationType = DONATION_TYPES.find(
                        (t) => t.value === donation.type
                      );
                      return (
                        <div
                          key={donation.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {getMemberName(donation.memberId)}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {donation.type} • {donation.method}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(donation.amount)}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(donation.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No recent donations</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Donors */}
            <div className="bg-white border rounded-lg shadow border-slate-900">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Top Donors
                </h3>
              </div>
              <div className="p-6">
                {summary.topDonors.length > 0 ? (
                  <div className="space-y-4">
                    {summary.topDonors.map((donor, index) => (
                      <div
                        key={donor.memberId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                            {getMemberName(donor.memberId)
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {getMemberName(donor.memberId)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(donor.total)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No donor data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
