import { Product } from "@/@types/api";
import Link from "next/link";
import React from "react";

interface TitleSectionProps {
  title: Product["title"];
}

export const TitleSection: React.FC<TitleSectionProps> = ({ title }) => (
  <Link href="#">
    <a className="hover:text-tertiary-foreground mt-2 block font-bold transition-colors lg:text-xl">
      {title}
    </a>
  </Link>
);
