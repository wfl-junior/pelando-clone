import { Price } from "@/components/Price";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";

export const PriceSection: React.FC = () => {
  const { price } = useProductForProductPage();

  return (
    <div className="text-primary xl:text-4.5xl text-3xl font-bold lg:text-center lg:text-4xl">
      <Price price={price} />
    </div>
  );
};
