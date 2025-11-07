"use client";
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const HomeSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="px-4 pb-3">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8 space-y-8">
        {/* Avatar */}
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Skeleton className="w-16 h-16 rounded-full" />
          </div>
        </div>

        {/* Name & Bio */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-4 w-60" />
          </div>
        </div>

        {/* Profile box */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <Skeleton className="h-5 w-28 mb-4" />
          {/* stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
          {/* rows */}
          <div className="space-y-3">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        </div>

        {/* feature cards */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-36 rounded-2xl" />
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-16 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </nav>
    </div>
  );
};

export default HomeSkeleton;
