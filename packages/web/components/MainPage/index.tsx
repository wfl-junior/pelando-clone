import { ProductsQueryInput } from "@/@types/api";
import React, { Fragment } from "react";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";

interface MainPageProps {
  productsQueryVariables?: ProductsQueryInput;
}

export const MainPage: React.FC<MainPageProps> = ({
  productsQueryVariables,
}) => (
  <Fragment>
    <HeroSection />
    <ProductsSection productsQueryVariables={productsQueryVariables} />
  </Fragment>
);
