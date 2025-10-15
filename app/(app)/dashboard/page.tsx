"use client";

import React from "react";
import { Users, BarChart3 } from "lucide-react";
import { useMembers } from "@/contexts/MembersContext";
import { useAttendance } from "@/contexts/AttendanceContext";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { totalMembers } = useMembers();
  const { attendanceRecords = [], services = [] } = useAttendance();

  const totalCheckins = attendanceRecords.filter(
    (record) => record.present
  ).length;

  const getAttendanceData = () => {
    // Group attendance by service date and count present members
    const attendanceByDate = services.map((service) => {
      const serviceRecords = attendanceRecords.filter(
        (record) =>
          new Date(record.serviceDate).toDateString() ===
            new Date(service.date).toDateString() &&
          record.serviceType === service.type
      );

      const presentCount = serviceRecords.filter(
        (record) => record.present
      ).length;

      return {
        name: new Date(service.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        date: service.date,
        Attendance: presentCount,
        serviceType: service.type,
      };
    });

    return attendanceByDate
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
  };

  const attendanceData = getAttendanceData();

  return (
    <div className="p-8 space-y-12">
      {/* Metrics */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Members Card */}
        <div className="relative flex flex-col justify-between p-10 transition bg-white border shadow-md border-slate-900 h-60 rounded-2xl hover:shadow-lg">
          {/* Icon top-left */}
          <div className="absolute p-2 top-6 left-6 rounded-xl bg-amber-100">
            <Users className="w-8 h-8 text-amber-500" />
          </div>

          {/* Text bottom-left */}
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-500">Total Members</p>
            <h2 className="mt-1 text-4xl font-bold text-gray-900">
              {totalMembers}
            </h2>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="relative flex flex-col justify-between p-10 transition bg-white border shadow-md border-slate-900 h-60 rounded-2xl hover:shadow-lg">
          {/* Icon top-left */}
          <div className="absolute p-2 top-6 left-6 rounded-xl bg-amber-100">
            <BarChart3 className="w-8 h-8 text-amber-500" />
          </div>

          {/* Text bottom-left */}
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-500">Total Attendance</p>
            <h2 className="mt-1 text-4xl font-bold text-gray-900">
              {totalCheckins}
            </h2>
          </div>
        </div>

        {/* Services Card */}
        <div className="relative flex flex-col justify-between p-10 transition bg-white border shadow-md border-slate-900 h-60 rounded-2xl hover:shadow-lg">
          {/* Icon top-left */}
          <div className="absolute p-2 bg-amber-100 top-6 left-6 rounded-xl">
            <Users className="w-8 h-8 text-amber-500" />
          </div>

          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-500">Services Held</p>
            <h2 className="mt-1 text-4xl font-bold text-gray-900">
              {services.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Graph and Recent Services Side by Side */}
      <div className="flex gap-6">
        {/* Attendance Graph - Left Side */}
        {attendanceData.length > 0 ? (
          <div className="p-6 bg-white border shadow-md border-slate-900 rounded-2xl w-[66%]">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Attendance Trend
            </h3>
            <ResponsiveContainer width="100%" height={380}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} attendees`, "Attendance"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="Attendance"
                  stroke="#f59e0b"
                  strokeWidth={4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 10 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500 border border-gray-300 border-dashed rounded-2xl w-[66%]">
            No attendance data yet. Create services and mark attendance to see
            the graph.
          </div>
        )}

        {/* Recent Services Summary - Right Side */}
        {services.length > 0 && (
          <div className="flex-1 p-6 bg-white border shadow-md border-slate-900 rounded-2xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Services
            </h3>
            <div className="space-y-4">
              {services.slice(-3).map((service) => {
                const serviceRecords = attendanceRecords.filter(
                  (record) =>
                    new Date(record.serviceDate).toDateString() ===
                      new Date(service.date).toDateString() &&
                    record.serviceType === service.type
                );
                const presentCount = serviceRecords.filter(
                  (record) => record.present
                ).length;

                return (
                  <div
                    key={service.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {new Date(service.date).toLocaleDateString()} •{" "}
                      {service.type}
                    </p>
                    <p className="mt-2 text-lg font-bold text-amber-600">
                      {presentCount} attendees
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
