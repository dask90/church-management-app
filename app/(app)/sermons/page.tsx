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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
          <p className="text-gray-600 mt-2">
            {isLoading ? "Loading..." : `Total ${sermons.length} sermons`}
          </p>
        </div>
        <Link
          href="/sermons/add"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add Sermon
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <div className="text-center py-8">
          <p className="text-gray-500">Loading sermons...</p>
        </div>
      ) : filteredSermons.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sermon.preacher}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(sermon.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {mediaType?.label || sermon.mediaType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/sermons/${sermon.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
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
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No sermons yet
            </h3>
            <p className="text-gray-500 mb-6">
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
