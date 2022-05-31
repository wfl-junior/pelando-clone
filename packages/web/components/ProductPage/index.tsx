import React, { Fragment } from "react";
import { ActionSection } from "./ActionSection";
import { DescriptionSection } from "./DescriptionSection";
import { HeaderSection } from "./HeaderSection";
import { ImageSection } from "./ImageSection";
import { TitleSection } from "./TitleSection";

export const ProductPage: React.FC = () => (
  <Fragment>
    <HeaderSection />

    <div className="lg:grid-template-areas-product-page flex flex-col gap-4 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)_18rem] lg:gap-6 xl:grid-cols-[20rem_minmax(0,1fr)_20rem]">
      <TitleSection />
      <ImageSection />
      <ActionSection />
      <DescriptionSection />
    </div>
  </Fragment>
);
