"use client";

import { useState } from "react";
import { useEvents } from "../../../contexts/EventsContext";
import Link from "next/link";

export default function EventsPage() {
  const { upcomingEvents, pastEvents, deleteEvent, isLoading } = useEvents();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
    setDeleteConfirm(null);
  };

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      service: "bg-blue-100 text-blue-800",
      meeting: "bg-green-100 text-green-800",
      outreach: "bg-purple-100 text-purple-800",
      social: "bg-orange-100 text-orange-800",
      conference: "bg-red-100 text-red-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[type] || colors.other;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="py-8 text-center">
          <div className="text-lg text-gray-600">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-gray-600">
            Manage church events and activities
          </p>
        </div>
        <Link
          href="/events/add"
          className="px-4 py-2 text-sm font-medium rounded-md bg-slate-900 text-amber-300"
        >
          Create Event
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-amber-300 text-slate-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "past"
                  ? "border-amber-300 text-slate-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Events List */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        {activeTab === "upcoming" ? (
          upcomingEvents.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                      </div>

                      <p className="mt-1 text-gray-600">{event.description}</p>

                      <div className="grid grid-cols-1 gap-4 mt-3 text-sm text-gray-500 sm:grid-cols-3">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {formatTime(event.startTime)} -{" "}
                          {formatTime(event.endTime)}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {event.venue}
                        </div>
                      </div>

                      <div className="flex items-center mt-3 text-sm text-gray-500">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Organized by {event.organizer}
                      </div>
                    </div>

                    <div className="flex items-center ml-6 space-x-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-slate-900 text-amber-300"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(event.id)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No upcoming events
              </h3>
              <p className="mb-6 text-gray-500">
                Schedule your first event to get started.
              </p>
              <Link
                href="/events/add"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-900"
              >
                Create Your First Event
              </Link>
            </div>
          )
        ) : pastEvents.length > 0 ? (
          <div className="divide-y divide-gray-200 ">
            {pastEvents.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </span>
                    </div>

                    <p className="mt-1 text-gray-600">{event.description}</p>

                    <div className="grid grid-cols-1 gap-4 mt-3 text-sm text-gray-500 sm:grid-cols-3">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatTime(event.startTime)} -{" "}
                        {formatTime(event.endTime)}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.venue}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <Link
                      href={`/events/${event.id}`}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-amber-300 bg-slate-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No past events
            </h3>
            <p className="text-gray-500">
              Past events will appear here once they&apos;re completed.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 mx-4 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Delete Event
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
