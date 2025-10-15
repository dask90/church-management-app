"use client";

import { useState } from "react";
import { useMembers } from "@/contexts/MembersContext";
import { useAttendance } from "@/contexts/AttendanceContext";
import { SERVICE_TYPES } from "@/types";
import Link from "next/link";

export default function AttendancePage() {
  const { members } = useMembers();
  const { markAttendance, createService } = useAttendance();

  const [selectedService, setSelectedService] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "sunday" as const,
    title: "",
    time: "09:00",
  });

  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize attendance state
  useState(() => {
    const initialAttendance: { [key: string]: boolean } = {};
    members.forEach((member) => {
      initialAttendance[member.id] = true; // Default to present
    });
    setAttendance(initialAttendance);
  });

  const handleServiceChange = (field: string, value: string) => {
    setSelectedService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAttendance = (memberId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create service record
      const service = createService({
        date: selectedService.date,
        type: selectedService.type as any,
        title:
          selectedService.title ||
          `${
            SERVICE_TYPES.find((s) => s.value === selectedService.type)?.label
          } - ${new Date(selectedService.date).toLocaleDateString()}`,
      });

      // Create attendance records
      const records = Object.entries(attendance).map(([memberId, present]) => ({
        memberId,
        serviceDate: selectedService.date,
        serviceType: selectedService.type as any,
        present,
        serviceTime: selectedService.time,
      }));

      markAttendance(records);

      // Reset form
      setSelectedService({
        date: new Date().toISOString().split("T")[0],
        type: "sunday",
        title: "",
        time: "09:00",
      });

      alert("Attendance recorded successfully!");
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert("Failed to record attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = members.length - presentCount;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="mt-2 text-gray-600">
            Record attendance for church services
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/attendance/reports"
            className="px-4 py-2 text-sm font-medium border rounded-md bg-slate-900 text-amber-300"
          >
            View Reports
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Service Information */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white border rounded-lg shadow border-slate-900">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Service Information
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Service Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedService.date}
                    onChange={(e) =>
                      handleServiceChange("date", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    required
                    value={selectedService.type}
                    onChange={(e) =>
                      handleServiceChange("type", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {SERVICE_TYPES.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Service Time
                  </label>
                  <input
                    type="time"
                    required
                    value={selectedService.time}
                    onChange={(e) =>
                      handleServiceChange("time", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Service Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={selectedService.title}
                    onChange={(e) =>
                      handleServiceChange("title", e.target.value)
                    }
                    placeholder="e.g., Easter Service, Youth Conference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Attendance Summary */}
                <div className="p-4 rounded-md bg-gray-50">
                  <h4 className="mb-2 font-medium text-gray-900">
                    Attendance Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">
                      <span className="font-medium">Present:</span>{" "}
                      {presentCount}
                    </div>
                    <div className="text-red-600">
                      <span className="font-medium">Absent:</span> {absentCount}
                    </div>
                    <div className="col-span-2 text-gray-600">
                      <span className="font-medium">Total:</span>{" "}
                      {members.length}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 text-sm font-medium rounded-md bg-slate-900 text-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Recording Attendance..."
                    : "Record Attendance"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Members List */}
        <div className="lg:col-span-3">
          <div className="bg-white border rounded-lg shadow border-slate-900">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Members List
              </h3>
            </div>
            <div className="p-6">
              {members.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-gray-500">No members found</p>
                  <Link
                    href="/members/add"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Add Your First Member
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-10 h-10 font-semibold text-blue-600 bg-blue-100 rounded-full">
                          {member.firstName.charAt(0)}
                          {member.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.groups.slice(0, 2).join(", ")}
                            {member.groups.length > 2 && "..."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span
                          className={`text-sm font-medium ${
                            attendance[member.id]
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {attendance[member.id] ? "Present" : "Absent"}
                        </span>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleAttendance(member.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              attendance[member.id]
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => toggleAttendance(member.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                              !attendance[member.id]
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
