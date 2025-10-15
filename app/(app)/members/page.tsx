"use client";

import { useMembers } from "@/contexts/MembersContext";
import Link from "next/link";

export default function Members() {
  const { members, isLoading } = useMembers();

  if (isLoading) {
    return <div className="p-6">.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Members</h1>
        <Link
          href="/members/add"
          className="px-4 py-2 rounded-md text-amber-300 bg-slate-900 hover:bg-slate-700"
        >
          Add Member
        </Link>
      </div>

      <div className="overflow-hidden bg-white border shadow border-slate-900 sm:rounded-md">
        <ul className="divide-y divide-slate-300">
          {members.map((member) => (
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
                  {/* View Details Action */}
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
          ))}
        </ul>
      </div>
    </div>
  );
}
