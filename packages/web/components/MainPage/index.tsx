import { ProductsQueryInput } from "@/@types/api";
import React, { Fragment } from "react";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";

interface MainPageProps {
  highlight?: boolean;
  productsQueryVariables?: ProductsQueryInput;
}

export const MainPage: React.FC<MainPageProps> = ({
  highlight,
  productsQueryVariables,
}) => (
  <Fragment>
    <HeroSection />
    <ProductsSection
      highlight={highlight}
      productsQueryVariables={productsQueryVariables}
    />
  </Fragment>
);
