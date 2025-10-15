"use client";

import Link from "next/link";

export default function RolesManagement() {
  const roles = [
    {
      name: "Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: [
        "Manage all users",
        "Configure system settings",
        "Access all modules",
        "Delete any content",
        "Manage roles and permissions",
      ],
    },
    {
      name: "Pastor",
      description: "Pastoral staff with extensive access",
      userCount: 3,
      permissions: [
        "Manage members",
        "Create and manage events",
        "View financial reports",
        "Manage sermons and content",
        "Access pastoral tools",
      ],
    },
    {
      name: "Staff",
      description: "Church staff with limited administrative access",
      userCount: 5,
      permissions: [
        "View member directory",
        "Manage events",
        "Record attendance",
        "Basic content management",
      ],
    },
    {
      name: "Member",
      description: "Regular church member access",
      userCount: 150,
      permissions: [
        "View personal profile",
        "Update personal information",
        "View event calendar",
        "Access member directory",
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/settings"
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
          Back to Settings
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="mt-2 text-gray-600">
            Configure user roles and permissions across the system
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role.name}
            className="overflow-hidden bg-white rounded-lg shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {role.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {role.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {role.userCount}
                  </div>
                  <div className="text-sm text-gray-500">users</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Permissions:
                </h4>
                <ul className="space-y-1">
                  {role.permissions.map((permission, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex pt-4 space-x-3 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Edit Role
                </button>
                {role.name !== "Admin" && role.name !== "Member" && (
                  <button className="px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Roles Section */}
      <div className="p-6 mt-8 rounded-lg bg-blue-50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-lg font-medium text-blue-900">
              Need custom roles?
            </h3>
            <p className="text-blue-700">
              Contact our support team to create custom roles tailored to your
              church&apos;s specific needs and workflows.
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Request Custom Role
          </button>
        </div>
      </div>
    </div>
  );
}
