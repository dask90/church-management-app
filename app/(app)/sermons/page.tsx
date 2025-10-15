"use client";

import { useSermons } from "@/contexts/SermonsContext";
import { MEDIA_TYPES } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function SermonsPage() {
  const { sermons, deleteSermon, isLoading } = useSermons();
  const [filterMediaType, setFilterMediaType] = useState<string>("all");

  const filteredSermons = sermons.filter((sermon) => {
    if (filterMediaType !== "all" && sermon.mediaType !== filterMediaType)
      return false;
    return true;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sermon?")) {
      deleteSermon(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
          <p className="mt-2 text-gray-600">
            {isLoading ? "Loading..." : `Total ${sermons.length} sermons`}
          </p>
        </div>
        <Link
          href="/sermons/add"
          className="px-4 py-2 text-sm font-medium rounded-md bg-slate-900 text-amber-300 hover:bg-blue-700"
        >
          Add Sermon
        </Link>
      </div>

      {/* Filter */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Media Type
            </label>
            <select
              value={filterMediaType}
              onChange={(e) => setFilterMediaType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {MEDIA_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilterMediaType("all")}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      {/* Sermons List */}
      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">Loading sermons...</p>
        </div>
      ) : filteredSermons.length > 0 ? (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Preacher
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSermons.map((sermon) => {
                  const mediaType = MEDIA_TYPES.find(
                    (t) => t.value === sermon.mediaType
                  );
                  return (
                    <tr key={sermon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {sermon.title}
                        </div>
                        {sermon.series && (
                          <div className="text-sm text-gray-500">
                            {sermon.series}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {sermon.preacher}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(sermon.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {mediaType?.label || sermon.mediaType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <Link
                          href={`/sermons/${sermon.id}`}
                          className="mr-4 text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(sermon.id)}
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
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No sermons yet
            </h3>
            <p className="mb-6 text-gray-500">
              Start building your sermon library by adding your first sermon.
            </p>
            <Link
              href="/sermons/add"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Your First Sermon
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
