import { Product } from "@/@types/api";
import { ProductCardContextProvider } from "@/contexts/ProductCardContext";
import React from "react";
import { CommentsAndSourceSection } from "./CommentsAndSourceSection";
import { ImageSection } from "./ImageSection";
import { PriceSection } from "./PriceSection";
import { StoreAndTimeSection } from "./StoreAndTimeSection";
import { TemperatureSection } from "./TemperatureSection";
import { TitleSection } from "./TitleSection";

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = props => (
  <ProductCardContextProvider {...props}>
    <div className="bg-default-background border-default-border grid-template-areas-product-card grid w-full grid-cols-[120px_auto] rounded border py-2 shadow-md md:w-3/4 lg:grid-cols-[156px_auto]">
      {/* image area */}
      <div className="pl-2 pb-2" style={{ gridArea: "image" }}>
        <ImageSection />
      </div>

      {/* content area */}
      <div className="px-2 pr-2 md:px-4" style={{ gridArea: "content" }}>
        <StoreAndTimeSection />

        <TitleSection />
        <PriceSection />
      </div>

      {/* action area */}
      <div
        className="border-default-border mt-auto flex items-center justify-between border-t px-2 pt-3 lg:pl-4"
        style={{ gridArea: "action" }}
      >
        <TemperatureSection />
        <CommentsAndSourceSection />
      </div>
    </div>
  </ProductCardContextProvider>
);
