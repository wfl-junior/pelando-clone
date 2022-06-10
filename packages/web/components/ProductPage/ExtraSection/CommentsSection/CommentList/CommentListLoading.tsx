import { Skeleton } from "@/components/Skeleton";
import React from "react";

interface CommentListLoadingProps {
  perPage: number;
}

export const CommentListLoading: React.FC<CommentListLoadingProps> = ({
  perPage,
}) => (
  <div className="p-4 md:px-8">
    <div className="flex animate-pulse flex-col gap-6">
      <div className="flex flex-col gap-8">
        <Skeleton className="h-2.5 w-48" />
        <Skeleton className="h-2.5 w-64" />
      </div>

      {Array.from({ length: perPage }, (_, i) => i).map(number => (
        <div key={number} className="flex gap-1">
          <Skeleton className="aspect-square w-10 self-start" />

          <div className="flex w-full flex-col gap-2">
            <div className="bg-secondary-background flex flex-col gap-4 rounded-xl p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-32" />
                  <Skeleton className="h-2 w-6" />
                </div>

                <Skeleton className="h-2 w-5" />
              </div>

              <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </div>

            <div className="flex items-center gap-6 self-end px-2 md:self-start">
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
