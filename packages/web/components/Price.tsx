import React, { Fragment } from "react";

interface PriceProps {
  price: number;
}

export const Price: React.FC<PriceProps> = ({ price }) => {
  if (price <= 0) {
    return <Fragment>Grátis</Fragment>;
  }

  return (
    <Fragment>
      <small>R$</small>
      {price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </Fragment>
  );
};
