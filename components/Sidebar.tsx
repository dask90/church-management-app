"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "/icons/dashboard.svg" },
  { name: "Members", href: "/members", icon: "/icons/group.svg" },
  { name: "Attendance", href: "/attendance", icon: "/icons/attendance.svg" },
  { name: "Events", href: "/events", icon: "/icons/event.svg" },
  { name: "Sermons", href: "/sermons", icon: "/icons/sermon.svg" },
  { name: "Donations", href: "/donations", icon: "/icons/dollar-line.svg" },
];

const adminNavigation = [
  { name: "Settings", href: "/settings", icon: "/icons/settings.svg" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isExpanded, isHovered } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen flex flex-col bg-white border-r border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-800 transition-all duration-300
        ${isExpanded || isHovered ? "w-[260px]" : "w-[90px]"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-8 border-b border-gray-200 dark:border-gray-800">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/icgc.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            {(isExpanded || isHovered) && (
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Church Admin
              </h1>
            )}
          </div>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-base font-medium transition-all duration-200 group
                ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 border-b border-slate-900 "
                }`}
            >
              <div
                className={`w-8 h-8 relative flex-shrink-0 ${
                  active ? "invert" : "invert-0 group-hover:invert"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={32}
                  height={32}
                />
              </div>
              {(isExpanded || isHovered) && <span>{item.name}</span>}
            </Link>
          );
        })}

        {/* Admin Section */}
        {user?.role === "admin" && (
          <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-800">
            {(isExpanded || isHovered) && (
              <p className="text-xs uppercase text-gray-400 font-semibold mb-3">
                Administration
              </p>
            )}
            {adminNavigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-lg text-base font-medium transition-all duration-200 group
                    ${
                      active
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                >
                  <div
                    className={`w-8 h-8 relative flex-shrink-0 ${
                      active ? "invert" : "invert-0 group-hover:invert"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.name} icon`}
                      width={32}
                      height={32}
                    />
                  </div>
                  {(isExpanded || isHovered) && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* User Info */}
      <div className="p-5 border-t border-gray-200 dark:border-gray-800">
        {user && (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-base">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            {(isExpanded || isHovered) && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
