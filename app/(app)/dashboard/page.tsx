"use client";

import { useMembers } from "../../../contexts/MembersContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useAttendance } from "@/contexts/AttendanceContext";
import { useDonations } from "@/contexts/DonationsContext";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    members,
    totalMembers,
    recentMembers,
    isLoading: membersLoading,
  } = useMembers();
  const { getAttendanceStats } = useAttendance();
  const { getDonationSummary, isLoading: donationsLoading } = useDonations();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const getMemberName = (memberId: string) => {
    const member = members.find((m) => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
  };

  const donationSummary = getDonationSummary();
  const attendanceStats = getAttendanceStats(totalMembers);

  const stats = [
    {
      name: "Total Members",
      value: membersLoading ? "..." : totalMembers.toString(),
      href: "/members",
      color: "bg-blue-500",
      icon: "👥",
    },
    {
      name: "Weekly Attendance",
      value: membersLoading ? "..." : `${attendanceStats.averageAttendance}%`,
      href: "/attendance",
      color: "bg-green-500",
      icon: "✅",
    },
    {
      name: "Total Donations",
      value: formatCurrency(donationSummary.totalDonations),
      href: "/donations",
      color: "bg-purple-500",
      icon: "💰",
    },
    {
      name: "Upcoming Events",
      value: "3",
      href: "/events",
      color: "bg-orange-500",
      icon: "📅",
    },
  ];

  const quickActions = [
    {
      name: "Add Member",
      href: "/members/add",
      icon: "➕",
      color: "bg-indigo-500",
    },
    {
      name: "Mark Attendance",
      href: "/attendance",
      icon: "📝",
      color: "bg-green-500",
    },
    {
      name: "Create Event",
      href: "/events/add",
      icon: "🎉",
      color: "bg-blue-500",
    },
    {
      name: "Record Donation",
      href: "/donations/add",
      icon: "💳",
      color: "bg-purple-500",
    },
  ];

  // Recent Activity Builder
  const getRecentActivity = () => {
    const activities: any[] = [];

    const recentMemberActivities = recentMembers.slice(0, 2).map((member) => ({
      action: "New member registered",
      user: `${member.firstName} ${member.lastName}`,
      time: `Joined ${new Date(member.joinDate).toLocaleDateString()}`,
      type: "member",
      href: `/members/${member.id}`,
    }));

    const recentDonations = donationSummary.recentDonations
      .slice(0, 2)
      .map((donation) => ({
        action: "Donation recorded",
        user: `${getMemberName(donation.memberId)} - ${formatCurrency(
          donation.amount
        )}`,
        time: new Date(donation.date).toLocaleDateString(),
        type: "donation",
        href: `/donations/${donation.id}`,
      }));

    activities.push(...recentMemberActivities, ...recentDonations);

    if (activities.length < 4) {
      activities.push(
        {
          action: "Attendance marked",
          user: "Sunday Service",
          time: "2 hours ago",
          type: "attendance",
          href: "/attendance",
        },
        {
          action: "Event created",
          user: "Youth Fellowship",
          time: "1 day ago",
          type: "event",
          href: "/events",
        }
      );
    }

    return activities.slice(0, 4);
  };

  const recentActivity = getRecentActivity();
  const isLoading = membersLoading || donationsLoading;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          {isLoading
            ? "Loading church data..."
            : `You have ${totalMembers} members and ${formatCurrency(
                donationSummary.totalDonations
              )} in total donations.`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition duration-200 transform hover:-translate-y-1 cursor-pointer">
              <div className="p-5 flex items-center">
                <div
                  className={`flex-shrink-0 p-3 rounded-md ${stat.color} bg-opacity-10`}
                >
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link key={action.name} href={action.href}>
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div
                      className={`flex-shrink-0 w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}
                    >
                      <span className="text-lg">{action.icon}</span>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {action.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <NotificationDropdown activities={recentActivity} />
          {isLoading && (
            <p className="text-sm text-gray-500 text-center py-4">
              Loading activity...
            </p>
          )}
        </div>
      </div>

      {/* Recent Members Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Members</h3>
          <Link
            href="/members"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        <div className="p-6">
          {membersLoading ? (
            <p className="text-center text-gray-500 py-4">Loading members...</p>
          ) : recentMembers.length > 0 ? (
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                      {member.firstName.charAt(0)}
                      {member.lastName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                    {member.groups.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        {member.groups.slice(0, 2).join(", ")}
                        {member.groups.length > 2 && "..."}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No members yet</p>
              <Link
                href="/members/add"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Your First Member
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Donations Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Recent Donations
          </h3>
          <Link
            href="/donations"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        <div className="p-6">
          {donationsLoading ? (
            <p className="text-center text-gray-500 py-4">
              Loading donations...
            </p>
          ) : donationSummary.recentDonations.length > 0 ? (
            <div className="space-y-4">
              {donationSummary.recentDonations.slice(0, 5).map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                      {getMemberName(donation.memberId)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {getMemberName(donation.memberId)}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {donation.type} • {donation.method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(donation.amount)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No donations yet</p>
              <Link
                href="/donations/add"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Record Your First Donation
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
