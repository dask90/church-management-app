"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface Activity {
  type: "member" | "donation" | "attendance" | "event";
  action: string;
  user: string;
  time: string;
}

interface NotificationDropdownProps {
  activities?: Activity[]; // optional to avoid undefined
}

export default function NotificationDropdown({
  activities = [], // default to empty array
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(activities.length > 0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (activities.length > 0) setNotifying(false);
  };

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        className="dropdown-toggle relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400"
        onClick={toggleDropdown}
      >
        {notifying && (
          <span className="absolute top-0.5 right-0 z-10 h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          </span>
        )}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875Z" />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-2 w-[350px] flex-col rounded-xl bg-white p-3 shadow-lg dark:bg-gray-800"
      >
        <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Recent Activity
          </h5>
          <button
            onClick={closeDropdown}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {activities.length === 0 && (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
          {activities.map((activity, i) => (
            <DropdownItem
              key={i}
              onItemClick={closeDropdown}
              className="flex gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <div
                className={`w-3 h-3 mt-2 rounded-full ${
                  activity.type === "donation"
                    ? "bg-green-500"
                    : activity.type === "attendance"
                    ? "bg-blue-500"
                    : activity.type === "event"
                    ? "bg-orange-500"
                    : "bg-purple-500"
                }`}
              ></div>
              <div className="flex-1 text-sm">
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {activity.user}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </DropdownItem>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
