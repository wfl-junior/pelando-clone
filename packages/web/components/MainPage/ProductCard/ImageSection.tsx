import { useProductCardContext } from "@/contexts/ProductCardContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ImageSection: React.FC = () => {
  const { product } = useProductCardContext();

  return (
    <Link href="#">
      <a className="border-default-border block aspect-square w-full overflow-hidden rounded border">
        <Image
          src={product.image}
          alt={`Imagem do produto ${product.title} da loja ${product.store.name}`}
          className="w-full object-contain"
          width={156}
          height={156}
        />
      </a>
    </Link>
  );
};
