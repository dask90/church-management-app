"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "../../../../contexts/EventsContext";
import { EVENT_TYPES } from "../../../../types";
import Link from "next/link";

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    venue: "",
    organizer: "",
    type: "service" as const,
    capacity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { addEvent } = useEvents();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation
      if (
        !formData.title ||
        !formData.date ||
        !formData.venue ||
        !formData.organizer
      ) {
        setError("Please fill in all required fields");
        return;
      }

      if (formData.startTime >= formData.endTime) {
        setError("End time must be after start time");
        return;
      }

      // Add the new event
      addEvent({
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date),
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        organizer: formData.organizer,
        type: formData.type,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
      });

      // Redirect to events list
      router.push("/events");
    } catch (error) {
      setError("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-3">
      <div className="mb-4">
        <Link
          href="/events"
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
          Back to Events
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
          <p className="mt-1 text-sm text-gray-600">
            Schedule a new church event or activity
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Basic Information */}
            <div className="md:col-span-3">
              <h3 className="mb-3 font-medium text-gray-900 text-md">
                Basic Information
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the event..."
              />
            </div>

            {/* Date & Time */}
            <div className="mt-2 md:col-span-3">
              <h3 className="mb-3 font-medium text-gray-900 text-md">
                Date & Time
              </h3>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                min={today}
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="endTime"
                required
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location & Organizer */}
            <div className="mt-2 md:col-span-3">
              <h3 className="mb-3 font-medium text-gray-900 text-md">
                Location & Organizer
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Venue <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="venue"
                required
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max capacity"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Organizer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizer"
                required
                value={formData.organizer}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter organizer name"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Link
              href="/events"
              className="px-6 py-2 text-sm font-medium text-white bg-red-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
