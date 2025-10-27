"use client";

import { useMembers } from "@/contexts/MembersContext";
import Link from "next/link";
import { useState } from "react";

export default function Members() {
  const { members, isLoading } = useMembers();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <div className="p-6">.</div>;
  }

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Members</h1>

        <div className="flex items-center w-full gap-4 sm:w-auto">
          <input
            type="text"
            placeholder="Search member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none sm:w-64 focus:ring-2 focus:ring-slate-800"
          />
          <Link
            href="/members/add"
            className="px-4 py-2 rounded-md text-amber-300 bg-slate-900 hover:bg-slate-700"
          >
            Add Member
          </Link>
        </div>
      </div>

      <div className="overflow-hidden bg-white border shadow border-slate-900 sm:rounded-md">
        <ul className="divide-y divide-slate-300">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li key={member.id}>
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/members/${member.id}`}
                      className="inline-flex items-center px-2 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-900 hover:bg-blue-700"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-gray-500">No members found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
