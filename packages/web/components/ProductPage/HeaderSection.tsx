import { Price } from "@/components/Price";
import { useProductQuery } from "@/hooks/apollo/queries/useProductQuery";
import { useRouter } from "next/router";
import React from "react";
import { getVariables } from ".";
import { ArrowLeftIcon } from "../icons/header/top/ArrowLeftIcon";
import { ExternalLinkIcon } from "../icons/product-page/ExternalLinkIcon";

export const HeaderSection: React.FC = () => {
  const { back, query } = useRouter();
  const { data, error } = useProductQuery({
    variables: getVariables(query.id as string),
  });

  if (!data || error) {
    return null;
  }

  const { title, price, sourceUrl } = data.product.product;

  return (
    <header className="bg-default-background xs:gap-3 container fixed inset-x-0 top-0 z-30 flex h-[3.75rem] items-center justify-between gap-2 sm:gap-4 md:hidden">
      <button onClick={back} aria-label="Voltar para página anterior">
        <ArrowLeftIcon className="w-6" />
      </button>

      <h2 className="before:from-default-background relative flex-grow overflow-x-hidden whitespace-nowrap text-center font-bold before:absolute before:inset-y-0 before:right-0 before:w-4 before:bg-gradient-to-l before:to-transparent">
        {title}
      </h2>

      <div className="flex items-center gap-1.5">
        <div className="text-primary font-bold">
          <Price price={price} />
        </div>

        <a
          href={sourceUrl}
          target="_blank"
          className="bg-primary hover:bg-primary-hover flex items-center justify-center rounded-full p-1 text-white"
        >
          <ExternalLinkIcon className="w-6" />
        </a>
      </div>
    </header>
  );
};
