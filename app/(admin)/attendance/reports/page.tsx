"use client";

import { useAttendance } from "@/contexts/AttendanceContext";
import { useMembers } from "@/contexts/MembersContext";
import Link from "next/link";
import { useState } from "react";

export default function AttendanceReports() {
  const { services, attendanceRecords, getAttendanceStats } = useAttendance();
  const { members } = useMembers();
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year" | "all"
  >("month");

  const stats = getAttendanceStats(members.length);

  // Calculate member attendance rates
  const memberAttendance = members
    .map((member) => {
      const memberRecords = attendanceRecords.filter(
        (record) => record.memberId === member.id
      );
      const totalServices = services.length;
      const attendedServices = memberRecords.filter(
        (record) => record.present
      ).length;
      const attendanceRate =
        totalServices > 0 ? (attendedServices / totalServices) * 100 : 0;

      return {
        ...member,
        attendedServices,
        totalServices,
        attendanceRate: Math.round(attendanceRate),
      };
    })
    .sort((a, b) => b.attendanceRate - a.attendanceRate);

  // Calculate service type statistics
  const serviceTypeStats = services.reduce((acc, service) => {
    const type = service.type;
    if (!acc[type]) {
      acc[type] = { count: 0, totalPresent: 0, totalMembers: 0 };
    }
    acc[type].count++;
    acc[type].totalPresent += service.totalPresent;
    acc[type].totalMembers += service.totalMembers;
    return acc;
  }, {} as { [key: string]: { count: number; totalPresent: number; totalMembers: number } });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Reports
          </h1>
          <p className="mt-2 text-gray-600">
            View attendance statistics and trends
          </p>
        </div>
        <Link
          href="/attendance"
          className="px-4 py-2 text-sm font-medium rounded-md bg-slate-900 text-amber-300"
        >
          Mark Attendance
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Services
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalServices}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Average Attendance
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.averageAttendance}%
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="text-2xl font-semibold text-gray-900">
                {members.length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Active Members
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {memberAttendance.filter((m) => m.attendanceRate >= 50).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Attendance */}
        <div className="bg-white border rounded-lg shadow border-slate-900">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Recent Services</h3>
          </div>
          <div className="p-6">
            {stats.recentAttendance.length > 0 ? (
              <div className="space-y-4">
                {stats.recentAttendance.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {service.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        {service.present} of {service.total} members present
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {Math.round((service.present / service.total) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Attendance Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No attendance records yet</p>
                <Link
                  href="/attendance"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-500"
                >
                  Mark your first attendance
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Service Type Breakdown */}
        <div className="bg-white border rounded-lg shadow border-slate-900">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Service Type Breakdown
            </h3>
          </div>
          <div className="p-6">
            {Object.entries(serviceTypeStats).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(serviceTypeStats).map(([type, stats]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {type} Service
                      </p>
                      <p className="text-sm text-gray-500">
                        {stats.count} services, {stats.totalPresent} total
                        attendance
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {stats.count > 0
                          ? Math.round(
                              (stats.totalPresent /
                                (stats.totalMembers * stats.count)) *
                                100
                            )
                          : 0}
                        %
                      </p>
                      <p className="text-xs text-gray-500">Avg. Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No service data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Member Attendance Ranking */}
        <div className="bg-white border rounded-lg shadow border-slate-900 lg:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              Member Attendance Ranking
            </h3>
          </div>
          <div className="p-6">
            {memberAttendance.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Member
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Services Attended
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {memberAttendance.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                              {member.firstName.charAt(0)}
                              {member.lastName.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {member.firstName} {member.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {member.attendedServices} / {member.totalServices}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-green-600 rounded-full"
                                style={{ width: `${member.attendanceRate}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-900">
                              {member.attendanceRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.attendanceRate >= 80
                                ? "bg-green-100 text-green-800"
                                : member.attendanceRate >= 50
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.attendanceRate >= 80
                              ? "Regular"
                              : member.attendanceRate >= 50
                              ? "Occasional"
                              : "Infrequent"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No member data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
