import React, { Fragment } from "react";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";

interface MainPageProps {
  highlight?: boolean;
}

export const MainPage: React.FC<MainPageProps> = ({ highlight }) => {
  return (
    <Fragment>
      <HeroSection />
      <ProductsSection highlight={highlight} />
    </Fragment>
  );
};
