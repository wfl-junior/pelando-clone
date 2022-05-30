import { useProductCardContext } from "@/contexts/ProductCardContext";
import Link from "next/link";
import React from "react";

export const TitleSection: React.FC = () => {
  const { product } = useProductCardContext();

  return (
    <Link href="#">
      <a className="hover:text-tertiary-foreground mt-2 block font-bold transition-colors lg:text-xl">
        {product.title}
      </a>
    </Link>
  );
};
