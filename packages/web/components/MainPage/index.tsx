import React, { Fragment } from "react";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";

interface MainPageProps {
  highlight?: boolean;
  category?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ highlight, category }) => {
  return (
    <Fragment>
      <HeroSection />
      <ProductsSection highlight={highlight} category={category} />
    </Fragment>
  );
};
