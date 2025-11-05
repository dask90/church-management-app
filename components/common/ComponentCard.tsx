"use client";

import React from "react";

interface ComponentCardProps {
  title: string;
  desc?: string;
  children: React.ReactNode;
}

export default function ComponentCard({
  title,
  desc,
  children,
}: ComponentCardProps) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm border-slate-900 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {desc && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
      )}
      <div>{children}</div>
    </div>
  );
}
