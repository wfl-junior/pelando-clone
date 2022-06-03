import { CheckIcon } from "@/components/icons/CheckIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import Link from "next/link";
import React from "react";

export const TitleSection: React.FC = () => {
  const { store, title } = useProductForProductPage();

  return (
    <div className="flex flex-col gap-2" style={{ gridArea: "title" }}>
      <div className="flex items-center gap-2 font-bold">
        <Link href="#">
          <a className="text-sm">{store.name}</a>
        </Link>

        <div className="bg-inactive-background flex items-center gap-1 rounded-full py-px pr-1.5 pl-1 text-[10px] uppercase md:py-0.5 md:pr-2 md:text-xs">
          <CheckIcon className="w-3.5 md:w-4" />
          <span>Loja Verificada</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">{title}</h1>

        {/* TODO: adicionar menu */}
        <button className="flex cursor-pointer flex-col gap-1 px-3.5 py-2">
          {Array.from({ length: 3 }, (_, i) => i).map(number => (
            <div
              className="bg-default-foreground aspect-square w-1 rounded-full"
              key={number}
            ></div>
          ))}
        </button>
      </div>
    </div>
  );
};
