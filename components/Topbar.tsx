"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";

const pageTitles: { [key: string]: string } = {
  "/dashboard": "Dashboard",
  "/members": "Members",
  "/members/add": "Add Member",
  "/attendance": "Attendance",
  "/events": "Events",
  "/sermons": "Sermons",
  "/donations": "Donations",
  "/settings": "Settings",
  "/settings/users": "User Management",
  "/settings/roles": "Role Management",
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const getPageTitle = () => {
    if (pageTitles[pathname]) return pageTitles[pathname];
    if (pathname.startsWith("/members/") && pathname !== "/members/add")
      return "Member Details";

    const segments = pathname.split("/").filter(Boolean);
    return segments.length > 0
      ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
      : "Dashboard";
  };

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) toggleSidebar();
      else toggleMobileSidebar();
    }
  };

  const handleLogout = () => logout();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsSearchVisible(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 h-70 w-full border-b border-gray-200 bg-white ">
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Left Section: Sidebar toggle + Logo */}
        <div className="flex mr-3 items-center gap-2">
          <button
            onClick={handleToggleSidebar}
            aria-label="Toggle Sidebar"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 lg:w-11 lg:h-11"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <Link href="/" className="lg:hidden">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="/images/logo/icgc.jpg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="/images/logo/icgc.jpg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Middle Section: Search */}
        <div className="hidden lg:block relative w-80">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or type command..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-transparent px-12 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-slate-800 focus:ring-3 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Right Section: Notifications + User */}
        <div className="ml-auto flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
