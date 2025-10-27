"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Settings, Church, Users, Shield, Bell, Lock } from "lucide-react";

type SettingsTab =
  | "general"
  | "users"
  | "roles"
  | "church"
  | "notifications"
  | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const { user } = useAuth();

  const tabs = [
    {
      id: "general" as SettingsTab,
      name: "General",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "church" as SettingsTab,
      name: "Church Info",
      icon: <Church className="w-4 h-4" />,
    },
    {
      id: "users" as SettingsTab,
      name: "Users",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "roles" as SettingsTab,
      name: "Roles",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "notifications" as SettingsTab,
      name: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: "security" as SettingsTab,
      name: "Security",
      icon: <Lock className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your church management system configuration
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 ">
          <nav className="p-4 bg-white border rounded-lg shadow border-slate-800">
            <div className="space-y-1">
              {tabs.map((tab) => {
                if (
                  (tab.id === "users" || tab.id === "roles") &&
                  user?.role !== "admin"
                ) {
                  return null;
                }
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-slate-800 text-amber-300"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3 text-gray-700">{tab.icon}</span>
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* System Info */}
          <div className="p-4 mt-6 bg-white border rounded-lg shadow border-slate-800">
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              System Information
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span>Users:</span>
                <span className="font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "church" && <ChurchSettings />}
            {activeTab === "users" && user?.role === "admin" && (
              <UsersSettings />
            )}
            {activeTab === "roles" && user?.role === "admin" && (
              <RolesSettings />
            )}
            {activeTab === "notifications" && <NotificationsSettings />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

// General Settings Component
function GeneralSettings() {
  const [formData, setFormData] = useState({
    churchName: "Grace Community Church",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    language: "en",
    currency: "USD",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <div className="px-6 py-4 border border-slate-800">
        <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
        <p className="mt-1 text-sm text-gray-600">
          Basic configuration for your church management system
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 border-b border-l border-r border-slate-800"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Church Name
            </label>
            <input
              type="text"
              name="churchName"
              value={formData.churchName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Time Format
            </label>
            <select
              name="timeFormat"
              value={formData.timeFormat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-300">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

// Church Settings Component
function ChurchSettings() {
  const [formData, setFormData] = useState({
    address: "123 Church Street",
    city: "Accra",
    state: "CA",
    zipCode: "12345",
    phone: "(555) 123-4567",
    email: "info@gracechurch.org",
    website: "https://gracechurch.org",
    pastorName: "Pastor John Smith",
    foundedYear: "1990",
    serviceTimes: "Sundays at 10:00 AM",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Church information saved successfully!");
  };

  return (
    <div>
      <div className="px-6 py-4 border border-slate-800">
        <h2 className="text-lg font-medium text-gray-900">
          Church Information
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your church&apos;s contact information and details
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 border-b border-l border-r border-slate-800"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Church Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Senior Pastor
            </label>
            <input
              type="text"
              name="pastorName"
              value={formData.pastorName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Year Founded
            </label>
            <input
              type="number"
              name="foundedYear"
              value={formData.foundedYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Service Times
            </label>
            <textarea
              name="serviceTimes"
              rows={3}
              value={formData.serviceTimes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Sundays at 10:00 AM, Wednesdays at 7:00 PM"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Save Church Information
          </button>
        </div>
      </form>
    </div>
  );
}

// Users Settings Component
function UsersSettings() {
  const { users } = useAuth();
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 border border-slate-800">
        <div>
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage system users and their permissions
          </p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800"
        >
          Add User
        </button>
      </div>

      <div className="p-6 border-b border-l border-r border-slate-800">
        {users && users.length > 0 ? (
          <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-blue-500 rounded-full">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button className="mr-4 text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mb-6 text-gray-500">
              Get started by adding your first user to the system.
            </p>
            <button
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800"
            >
              Add User
            </button>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Add New User
            </h3>
            <p className="mb-6 text-gray-600">
              User management functionality will be implemented in the next
              update.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Roles Settings Component
function RolesSettings() {
  const roles = [
    { name: "Admin", description: "Full system access", permissions: ["All"] },
    {
      name: "Pastor",
      description: "Pastoral staff access",
      permissions: ["Members", "Events", "Sermons"],
    },
  ];

  return (
    <div>
      <div className="px-6 py-4 border border-slate-800">
        <h2 className="text-lg font-medium text-gray-900">Role Management</h2>
        <p className="mt-1 text-sm text-gray-600">
          Configure user roles and permissions
        </p>
      </div>

      <div className="p-6 border-b border-l border-r border-slate-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role.name} className="p-6 rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {role.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {role.description}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  {role.permissions.length} permissions
                </span>
              </div>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Permissions:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(role.permissions) ? (
                    role.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded"
                      >
                        {permission}
                      </span>
                    ))
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                      {role.permissions}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Edit Role
                </button>
                {role.name !== "Admin" && (
                  <button className="px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Notifications Settings Component
function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    newMemberAlerts: true,
    donationReceipts: true,
    weeklyReports: false,
    systemUpdates: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Notification preferences saved!");
  };

  return (
    <div>
      <div className="px-6 py-4 border border-slate-800">
        <h2 className="text-lg font-medium text-gray-900">
          Notification Settings
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Configure how you receive notifications and alerts
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 border-b border-l border-r border-slate-800"
      >
        <div className="space-y-6">
          {/* Notification Channels */}
          <div>
            <h3 className="mb-4 font-medium text-gray-900 text-md">
              Notification Channels
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2  focus:ring-offset-2 ${
                    notifications.emailNotifications
                      ? "bg-slate-800"
                      : "bg-amber-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.emailNotifications
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    SMS Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications via text message
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("smsNotifications")}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    notifications.smsNotifications
                      ? "bg-slate-800"
                      : "bg-amber-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.smsNotifications
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="mb-4 font-medium text-gray-900 text-md">
              Notification Types
            </h3>
            <div className="space-y-4">
              {[
                {
                  key: "eventReminders" as const,
                  label: "Event Reminders",
                  description: "Get reminded about upcoming events",
                },
                {
                  key: "newMemberAlerts" as const,
                  label: "New Member Alerts",
                  description: "Be notified when new members join",
                },
                {
                  key: "donationReceipts" as const,
                  label: "Donation Receipts",
                  description: "Receive donation confirmation receipts",
                },
                {
                  key: "weeklyReports" as const,
                  label: "Weekly Reports",
                  description: "Get weekly summary reports",
                },
                {
                  key: "systemUpdates" as const,
                  label: "System Updates",
                  description: "Receive system maintenance notifications",
                },
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">
                      {label}
                    </label>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-offset-2 ${
                      notifications[key] ? "bg-slate-800" : "bg-amber-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notifications[key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 mt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800 focus:outline-none focus:ring-offset-2"
          >
            Save Notification Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

// Security Settings Component
function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordExpiry: 90,
    loginAlerts: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Security settings saved!");
  };

  return (
    <div>
      <div className="px-6 py-4 border border-slate-800">
        <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
        <p className="mt-1 text-sm text-gray-600">
          Configure security preferences and access controls
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 border-b border-l border-r border-slate-800"
      >
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setSecurity((prev) => ({
                ...prev,
                twoFactorAuth: !prev.twoFactorAuth,
              }))
            }
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              security.twoFactorAuth ? "bg-slate-800" : "bg-amber-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                security.twoFactorAuth ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Session Timeout */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Session Timeout (minutes)
          </label>
          <select
            value={security.sessionTimeout}
            onChange={(e) =>
              setSecurity((prev) => ({
                ...prev,
                sessionTimeout: parseInt(e.target.value),
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={120}>2 hours</option>
            <option value={0}>Never (not recommended)</option>
          </select>
        </div>

        {/* Password Expiry */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password Expiry (days)
          </label>
          <select
            value={security.passwordExpiry}
            onChange={(e) =>
              setSecurity((prev) => ({
                ...prev,
                passwordExpiry: parseInt(e.target.value),
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
            <option value={90}>90 days</option>
            <option value={180}>180 days</option>
            <option value={0}>Never expire</option>
          </select>
        </div>

        {/* Login Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Login Alerts</h3>
            <p className="text-sm text-gray-500">
              Get notified of new sign-ins from unfamiliar devices
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setSecurity((prev) => ({
                ...prev,
                loginAlerts: !prev.loginAlerts,
              }))
            }
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              security.loginAlerts ? "bg-slate-800" : "bg-amber-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                security.loginAlerts ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Security Actions */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Security Actions
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              className="w-full px-4 py-3 text-sm text-left text-blue-600 rounded-md bg-blue-50 hover:bg-blue-100"
            >
              Change Password
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 text-sm text-left text-blue-600 rounded-md bg-blue-50 hover:bg-blue-100"
            >
              View Login History
            </button>
            <button
              type="button"
              className="w-full px-4 py-3 text-sm text-left text-red-600 rounded-md bg-red-50 hover:bg-red-100"
            >
              Log Out All Devices
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-md text-amber-300 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Security Settings
          </button>
        </div>
      </form>
    </div>
  );
}
