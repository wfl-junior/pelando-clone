import { ProductsQueryInput } from "@/@types/api";
import React from "react";
import { AdSkeleton } from "../AdSkeleton";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";

interface MainPageProps {
  productsQueryVariables?: ProductsQueryInput;
}

export const MainPage: React.FC<MainPageProps> = ({
  productsQueryVariables,
}) => (
  <div className="container flex flex-col gap-6 lg:gap-8">
    <HeroSection />
    <AdSkeleton className="xs:h-32 xs:w-96 mx-auto h-24 w-72 md:h-24 md:w-[736px] lg:h-32 lg:w-3/4 xl:h-40 xl:w-full" />
    <ProductsSection productsQueryVariables={productsQueryVariables} />
  </div>
);
