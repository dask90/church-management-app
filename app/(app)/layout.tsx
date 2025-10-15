"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Backdrop from "@/components/Backdrop";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();

  // Handle redirect if user not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // If user not authenticated
  if (!user) return null;

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[230px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen bg-gray-100 xl:flex">
      {/* Sidebar and Backdrop */}
      <Sidebar />
      {isMobileOpen && <Backdrop />}

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <Topbar />

        {/* Page Content */}
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
