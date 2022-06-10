import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";

interface HeadingSectionProps {}

export const HeadingSection: React.FC<HeadingSectionProps> = () => {
  const { commentCount } = useProductForProductPage();

  return (
    <h2 className="text-xl font-bold md:text-2xl">
      {commentCount} comentários
    </h2>
  );
};
