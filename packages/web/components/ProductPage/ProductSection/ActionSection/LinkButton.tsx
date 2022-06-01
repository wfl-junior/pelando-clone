import { ExternalLinkIcon } from "@/components/icons/product-page/ExternalLinkIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";

export const LinkButton: React.FC = () => {
  const { sourceUrl } = useProductForProductPage();

  return (
    <a
      href={sourceUrl}
      target="_blank"
      className="bg-primary hover:bg-primary-hover relative flex items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors"
    >
      Pegar promoção
      <ExternalLinkIcon className="absolute top-1/2 right-2.5 w-5 -translate-y-1/2" />
    </a>
  );
};
