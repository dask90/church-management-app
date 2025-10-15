"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSermons } from "@/contexts/SermonsContext";
import { MEDIA_TYPES } from "@/types";
import Link from "next/link";
import { FaFileUpload } from "react-icons/fa";

export default function AddSermon() {
  const { addSermon } = useSermons();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    mediaUrl: "",
    mediaType: "audio" as "audio" | "video" | "text",
    duration: "",
    series: "",
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Trigger file explorer
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // When a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      // Create a local URL for preview or temp use
      setFormData((prev) => ({
        ...prev,
        mediaUrl: URL.createObjectURL(selected),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!formData.title || !formData.preacher || !formData.date) {
        setError("Title, preacher, and date are required");
        return;
      }

      addSermon({
        title: formData.title,
        preacher: formData.preacher,
        date: new Date(formData.date),
        description: formData.description,
        mediaUrl: formData.mediaUrl,
        mediaType: formData.mediaType,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        series: formData.series || undefined,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });

      router.push("/sermons");
    } catch (error) {
      console.error("Error adding sermon:", error);
      setError("Failed to add sermon. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link
          href="/sermons"
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
          Back to Sermons
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Sermon</h1>
          <p className="mt-1 text-sm text-gray-600">
            Share a new sermon with your congregation
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
            {/* Sermon Details */}
            <div className="md:col-span-3">
              <h3 className="mb-3 font-bold text-gray-900 text-md">
                Sermon Details
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900"
                placeholder="Enter sermon title"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Media Type <span className="text-red-500">*</span>
              </label>
              <select
                name="mediaType"
                required
                value={formData.mediaType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900"
              >
                {MEDIA_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Preacher <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="preacher"
                required
                value={formData.preacher}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900"
                placeholder="Enter preacher's name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Duration (min)
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-900"
                placeholder="e.g., 45"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Series
              </label>
              <input
                type="text"
                name="series"
                value={formData.series}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sermon series (optional)"
              />
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
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sermon description"
              />
            </div>

            {/* Media Information */}
            <div className="mt-2 md:col-span-3">
              <h3 className="mb-3 font-bold text-gray-900 text-md">
                Media Information
              </h3>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Upload Media File <span className="text-red-500">*</span>
              </label>
              <div
                onClick={handleUploadClick}
                className="flex flex-col items-center justify-center p-4 text-gray-500 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-600 hover:text-blue-600"
              >
                <FaFileUpload size={20} className="mb-1" />
                <span className="text-sm text-center">
                  {file ? file.name : "Click to upload audio, video, or text"}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*,.pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="grace, faith, salvation"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <Link
              href="/sermons"
              className="px-6 py-2 text-sm font-medium text-white bg-red-600 border rounded-md "
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-900 disabled:opacity-50"
            >
              {isSubmitting ? "Adding Sermon..." : "Add Sermon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
