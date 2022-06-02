import React from "react";
import { AlertsSection } from "./AlertsSection";
import { CommentsSection } from "./CommentsSection";
import { DealsSection } from "./DealsSection";
import { StoresSection } from "./StoresSection";

export const ExtraSection: React.FC = () => (
  <div className="grid-template-areas-product-page-extra grid gap-4 lg:container lg:grid-cols-[auto_280px] lg:gap-x-6 xl:grid-cols-[auto_320px]">
    <AlertsSection />
    <CommentsSection />
    <DealsSection />
    <StoresSection />
  </div>
);
