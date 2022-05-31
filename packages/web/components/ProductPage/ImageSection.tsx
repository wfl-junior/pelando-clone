import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import Image from "next/image";
import React from "react";

export const ImageSection: React.FC = () => {
  const { sourceUrl, image } = useProductForProductPage();

  return (
    <div className="lg:pb-6" style={{ gridArea: "image" }}>
      <a
        href={sourceUrl}
        target="_blank"
        className="md:border-default-border flex items-center justify-center rounded md:border md:p-0.5 lg:aspect-square lg:w-full"
      >
        <Image
          src={image}
          className="max-w-full object-contain"
          width={1920}
          height={1080}
        />
      </a>
    </div>
  );
};
