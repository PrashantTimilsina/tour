"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonPosts() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-md shadow bg-white dark:bg-blue-950"
        >
          <Skeleton height={24} width="60%" />
          <Skeleton count={3} className="mt-2" />
        </div>
      ))}
    </div>
  );
}
