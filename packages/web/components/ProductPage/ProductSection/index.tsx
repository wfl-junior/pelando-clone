import React from "react";
import { ActionSection } from "./ActionSection";
import { DescriptionSection } from "./DescriptionSection";
import { ImageSection } from "./ImageSection";
import { TitleSection } from "./TitleSection";

export const ProductSection: React.FC = () => (
  <div className="grid-template-areas-product-page grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)_18rem] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-2 xl:grid-cols-[20rem_minmax(0,1fr)_20rem]">
    <TitleSection />
    <ImageSection />
    <ActionSection />
    <DescriptionSection />
  </div>
);
