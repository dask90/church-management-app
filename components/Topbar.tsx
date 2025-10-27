"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
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
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

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

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

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
    <header className="sticky top-0 w-full bg-white border-b border-slate-900 h-70">
      <div className="flex flex-col items-center justify-between w-full lg:flex-row">
        {/* Top Section */}
        <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6 lg:py-4">
          {/* Left Section: Sidebar toggle + Logo */}
          <div className="flex items-center gap-2 mr-3">
            <button
              onClick={handleToggleSidebar}
              aria-label="Toggle Sidebar"
              className="flex items-center justify-center w-10 h-10 border rounded-lg border-slate-900 hover:bg-gray-400 lg:w-11 lg:h-11"
            >
              <Image
                src="/icons/manual.svg"
                alt="Toggle Sidebar"
                width={24}
                height={24}
                className="h-7 w-7"
              />
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

          {/* Middle Section: Search (desktop only)
          <div className="relative hidden lg:block w-80">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type command..."
              className="h-11 w-full rounded-lg border  border-slate-900 bg-transparent px-12 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-slate-800 focus:ring-3 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <span className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">
              🔍
            </span>
          </div> */}

          {/* Mobile Menu Toggle (3 dots) */}
          <button
            onClick={toggleApplicationMenu}
            className="z-50 flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          >
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
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Right Section: Notifications + User (desktop) */}
          <div className="items-center hidden gap-4 ml-auto lg:flex">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>

        {/* Mobile Application Menu Section */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } w-full items-center justify-between gap-4 px-5 py-4 lg:hidden border-t border-gray-200 dark:border-gray-800`}
        >
          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
