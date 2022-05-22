import { Product } from "@/@types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CommentsAndSourceSection } from "./CommentsAndSourceSection";
import { PriceSection } from "./PriceSection";
import { StoreAndTimeSection } from "./StoreAndTimeSection";
import { TemperatureSection } from "./TemperatureSection";
import { TitleSection } from "./TitleSection";

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  highlight,
}) => (
  <div className="bg-default-background border-default-border grid-template-areas-product-card grid w-full grid-cols-[120px_auto] rounded border py-2 shadow-md md:w-3/4 lg:grid-cols-[156px_auto]">
    {/* image area */}
    <div className="pl-2 pb-2" style={{ gridArea: "image" }}>
      <Link href="#">
        <a className="border-default-border block aspect-square w-full overflow-hidden rounded border">
          <Image
            src={product.image}
            alt={`Imagem do produto ${product.title} da loja ${product.store.name}`}
            className="w-full object-contain"
            width="156"
            height="156"
          />
        </a>
      </Link>
    </div>

    {/* content area */}
    <div className="px-2 pr-2 md:px-4" style={{ gridArea: "content" }}>
      <StoreAndTimeSection
        createdAt={product.createdAt}
        store={product.store}
        highlight={highlight}
      />

      <TitleSection title={product.title} />
      <PriceSection price={product.price} />
    </div>

    {/* action area */}
    <div
      className="border-default-border mt-auto flex items-center justify-between border-t px-2 pt-3 lg:pl-4"
      style={{ gridArea: "action" }}
    >
      <TemperatureSection temperature={product.temperature} />
      <CommentsAndSourceSection sourceUrl={product.sourceUrl} />
    </div>
  </div>
);
