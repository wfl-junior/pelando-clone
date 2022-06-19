import { Price } from "@/components/Price";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import React from "react";

export const PriceSection: React.FC = () => {
  const { product } = useProductCardContext();

  return (
    <p className="text-primary md:text-2.5xl mt-1 text-2xl font-bold">
      <Price price={product.price} />
    </p>
  );
};
