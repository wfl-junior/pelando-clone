import { Product } from "@/@types/api";
import React, { Fragment } from "react";

interface PriceSectionProps {
  price: Product["price"];
}

export const PriceSection: React.FC<PriceSectionProps> = ({ price }) => (
  <p className="text-primary md:text-2.5xl mt-1 text-2xl font-bold">
    {price > 0 ? (
      <Fragment>
        <small className="text-[75%] md:text-[72%]">R$</small>
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Fragment>
    ) : (
      <Fragment>Grátis</Fragment>
    )}
  </p>
);
