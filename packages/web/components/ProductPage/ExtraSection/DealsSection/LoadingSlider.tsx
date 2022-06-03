import { Skeleton } from "@/components/Skeleton";
import React from "react";

export const LoadingSlider: React.FC = () => (
  <div className="lg:no-scrollbar grid snap-x snap-proximity grid-flow-col gap-2 overflow-x-auto">
    {Array.from({ length: 6 }, (_, i) => i).map(number => (
      <div
        key={number}
        className="border-default-border bg-default-background aspect-square w-44 animate-pulse snap-start rounded border shadow md:w-56"
      >
        <Skeleton className="h-28 w-full rounded-none" />

        <div className="flex flex-col gap-2 px-3 pb-1 md:pb-2">
          <div className="flex items-center justify-between gap-2">
            <div className="mt-1 flex items-center gap-2">
              <Skeleton className="h-2.5 w-12" />
              <Skeleton className="h-2.5 w-8" />
            </div>

            <Skeleton className="h-2.5 w-8" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    ))}
  </div>
);
