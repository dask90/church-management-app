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
  const { isExpanded, isHovered, isMobileOpen, setIsHovered } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const AMBER_300 = "#fcd34d";
  const INACTIVE_ICON = "#374151";

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col border-r border-slate-900 bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 ease-in-out
          ${
            isExpanded || isMobileOpen
              ? "w-[230px]"
              : isHovered
              ? "w-[230px]"
              : "w-[90px]"
          }
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo */}
        <div
          className={`flex items-center justify-center py-8 ${
            !isExpanded && !isHovered && !isMobileOpen
              ? "lg:justify-center"
              : ""
          }`}
        >
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo/icgc.jpg"
                alt="Logo"
                width={70}
                height={60}
                className="rounded-md"
              />
              {(isExpanded || isHovered || isMobileOpen) && (
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  {/* Church Admin */}
                </h1>
              )}
            </div>
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar">
          {navigation.map((item) => {
            const active = isActive(item.href);

            const maskStyle: React.CSSProperties = {
              width: 24,
              height: 24,
              display: "inline-block",
              backgroundColor: active ? AMBER_300 : INACTIVE_ICON,
              WebkitMaskImage: `url(${item.icon})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              maskImage: `url(${item.icon})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "center",
            };

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg border-slate-900 border-b  text-base font-medium transition-all duration-200 group
                  ${
                    active
                      ? "bg-slate-900 text-amber-300"
                      : "text-gray-600 hover:bg-gray-100 "
                  }`}
              >
                <span aria-hidden style={maskStyle} className="flex-shrink-0" />
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span>{item.name}</span>
                )}
              </Link>
            );
          })}

          {/* Admin Section */}
          {user?.role === "admin" && (
            <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-800">
              {(isExpanded || isHovered || isMobileOpen) && (
                <p className="mb-3 text-xs font-semibold text-gray-400 uppercase">
                  Administration
                </p>
              )}
              {adminNavigation.map((item) => {
                const active = isActive(item.href);

                const maskStyle: React.CSSProperties = {
                  width: 24,
                  height: 24,
                  display: "inline-block",
                  backgroundColor: active ? AMBER_300 : INACTIVE_ICON,
                  WebkitMaskImage: `url(${item.icon})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskImage: `url(${item.icon})`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                  maskPosition: "center",
                };

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-lg text-base font-medium transition-all duration-200 group
                      ${
                        active
                          ? "bg-slate-900 text-amber-300"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <span
                      aria-hidden
                      style={maskStyle}
                      className="flex-shrink-0"
                    />
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>{item.name}</span>
                    )}
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
              <div className="flex items-center justify-center w-10 h-10 text-base font-semibold text-white bg-blue-600 rounded-full">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              {(isExpanded || isHovered || isMobileOpen) && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
