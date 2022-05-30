import { Skeleton } from "@/components/Skeleton";
import React from "react";

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-default-background/5 border-default-border grid-template-areas-product-card grid w-full animate-pulse grid-cols-[120px_auto] rounded border py-2 shadow-md lg:grid-cols-[156px_auto]">
    {/* image area */}
    <div className="pl-2 pb-2" style={{ gridArea: "image" }}>
      <div className="border-default-border bg-inactive-background aspect-square w-full rounded border"></div>
    </div>

    {/* content area */}
    <div
      className="flex flex-col gap-3 px-2 pr-2 md:px-4"
      style={{ gridArea: "content" }}
    >
      {/* store & time */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-2 w-12" />

        <Skeleton className="h-2 w-5" />
      </div>

      {/* title */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-full" />

        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* price */}
      <Skeleton className="h-2.5 w-16" />
    </div>

    {/* action area */}
    <div
      className="border-default-border mt-auto flex items-center justify-between border-t px-2 pt-3 lg:pl-4"
      style={{ gridArea: "action" }}
    >
      {/* temperature */}
      <Skeleton className="h-10 w-24 p-1.5" border />

      {/* comments & cart */}
      <div className="flex items-center gap-2 md:gap-6">
        <Skeleton className="h-10 w-16 p-1.5" border />

        <Skeleton className="h-10 w-24 p-1.5" border />
      </div>
    </div>
  </div>
);
