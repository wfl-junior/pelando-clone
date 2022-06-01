import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React, { Fragment } from "react";

export const PriceSection: React.FC = () => {
  const { price } = useProductForProductPage();

  return (
    <div className="text-primary xl:text-4.5xl text-3xl font-bold lg:text-center lg:text-4xl">
      {price > 0 ? (
        <Fragment>
          <small>R$</small>
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Fragment>
      ) : (
        "Grátis"
      )}
    </div>
  );
};
