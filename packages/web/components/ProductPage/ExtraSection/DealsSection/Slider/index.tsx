import { defaultErrorMessage } from "@/constants";
import { useProductsQuery } from "@/hooks/apollo/queries/useProductsQuery";
import React from "react";
import { Slider } from "./Slider";
import { SliderLoading } from "./SliderLoading";

export const SliderContainer: React.FC = () => {
  const { data, error, loading } = useProductsQuery({
    variables: {
      input: {
        perPage: 20,
        orderBy: {
          temperature: "DESC",
        },
      },
    },
  });

  if (loading) {
    return <SliderLoading />;
  }

  if (!data || error) {
    return <p className="font-bold">{defaultErrorMessage}</p>;
  }

  return <Slider products={data.products.products.edges} />;
};
