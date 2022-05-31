import React from "react";
import { CommentButton } from "./CommentButton";
import { CouponButton } from "./CouponButton";
import { LinkButton } from "./LinkButton";
import { PriceSection } from "./PriceSection";
import { ShareButton } from "./ShareButton";
import { TemperatureSection } from "./TemperatureSection";

export const ActionSection: React.FC = () => (
  <div
    className="flex flex-col justify-center gap-4 lg:aspect-square lg:w-full"
    style={{ gridArea: "action" }}
  >
    <PriceSection />

    <div className="flex flex-col gap-2">
      <CouponButton />
      <LinkButton />
    </div>

    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] place-items-center gap-y-2 gap-x-4 lg:gap-y-1">
      <CommentButton />
      <TemperatureSection />
      <ShareButton />

      <div className="text-secondary-foreground contents text-[10px] font-bold md:text-xs">
        <span>comentar</span>
        <span>esfriar / esquentar</span>
        <span>compartilhar</span>
      </div>
    </div>
  </div>
);
