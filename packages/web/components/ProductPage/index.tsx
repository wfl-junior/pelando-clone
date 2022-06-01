import { ProductQueryVariables } from "@/@types/api";
import { defaultErrorMessage } from "@/constants";
import { useProductQuery } from "@/hooks/apollo/queries/useProductQuery";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { HeaderSection } from "./HeaderSection";
import { ProductSection } from "./ProductSection";

export function getVariables(id: string): ProductQueryVariables {
  return {
    input: {
      where: { id },
    },
  };
}

export const ProductPage: React.FC = () => {
  const { query } = useRouter();
  const { data, error } = useProductQuery({
    variables: getVariables(query.id as string),
  });

  return (
    <Fragment>
      <HeaderSection />

      <div className="flex flex-col gap-4">
        <section className="bg-default-background pt-8">
          <div className="container">
            {!data || error ? (
              <div className="flex items-center justify-center">
                <p className="text-center font-bold lg:text-xl">
                  {defaultErrorMessage}
                </p>
              </div>
            ) : (
              <ProductSection />
            )}
          </div>
        </section>
      </div>
    </Fragment>
  );
};
