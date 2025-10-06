"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth } from "@/contexts/AuthContext";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full bg-gray-200 p-2 text-black font-semibold"
      >
        <div className="flex h-9 w-9 items-center justify-center  text-white font-semibold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="hidden md:block">{user?.name || "User"}</span>
        <svg
          className={`stroke-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-2 flex w-[260px] flex-col rounded-2xl border border-slate-800 bg-white p-3 dark:border-gray-800"
      >
        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-400">
            {user?.name || "User"}
          </span>
          <span className="block text-gray-500 text-sm">
            {user?.email || "user@example.com"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              href="/profile"
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-green-800 hover:text-white dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 font-medium"
            >
              Account settings
            </DropdownItem>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-2 w-full rounded-lg bg-red-100 px-3 py-2 text-red-600 hover:bg-red-200 transition font-medium"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
