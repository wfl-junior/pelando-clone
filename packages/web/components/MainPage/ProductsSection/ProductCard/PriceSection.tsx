import { useProductCardContext } from "@/contexts/ProductCardContext";
import React, { Fragment } from "react";

export const PriceSection: React.FC = () => {
  const { product } = useProductCardContext();

  return (
    <p className="text-primary md:text-2.5xl mt-1 text-2xl font-bold">
      {product.price > 0 ? (
        <Fragment>
          <small className="text-[75%] md:text-[72%]">R$</small>
          {product.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Fragment>
      ) : (
        <Fragment>Grátis</Fragment>
      )}
    </p>
  );
};
