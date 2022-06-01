import { HomeIcon } from "@/components/icons/product-page/HomeIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import Link from "next/link";
import React from "react";

export const LocationSection: React.FC = () => {
  const { category } = useProductForProductPage();

  return (
    <div className="flex flex-col px-4 text-sm md:px-2">
      <span className="text-secondary-foreground">você está em:</span>

      <div className="flex items-center">
        <Link href="/">
          <a className="hover:text-tertiary-foreground transition-colors">
            <HomeIcon className="w-4" />
          </a>
        </Link>

        <span
          className="bg-default-foreground/75 mx-2 h-2/3 w-px"
          aria-hidden="true"
        />

        <Link href={`/${category.slug}`}>
          <a className="hover:text-tertiary-foreground transition-colors">
            {category.title}
          </a>
        </Link>
      </div>
    </div>
  );
};
