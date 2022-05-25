import { Skeleton } from "@/components/Skeleton";
import React from "react";

export const NotificationItemSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse gap-4 p-4">
      <Skeleton
        className="aspect-square w-12"
        border
        style={{ borderRadius: "0.25rem" }}
      />

      <div className="flex flex-grow flex-col gap-3">
        <Skeleton className="bg-secondary-foreground/75 h-1 w-4/5" />
        <Skeleton className="bg-secondary-foreground h-1 w-full" />

        <div className="flex items-center gap-1.5">
          <Skeleton className="bg-secondary-foreground/75 h-1 w-1/3" />
          <Skeleton className="h-1 w-6" />
        </div>
      </div>
    </div>
  );
};
