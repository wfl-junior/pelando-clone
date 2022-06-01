import { HomeIcon } from "@/components/icons/product-page/HomeIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import Link from "next/link";
import React from "react";

export const CommentsSection: React.FC = () => {
  const { category } = useProductForProductPage();

  return (
    <section
      className="flex flex-col gap-4 md:container lg:px-0"
      style={{ gridArea: "comments" }}
    >
      <div
        className="bg-default-background p-4 shadow md:rounded-lg md:px-8"
        style={{ gridArea: "comments" }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">0 comentários</h2>

          <button
            type="button"
            className="border-default-border min-w-[135px] rounded-full border py-2 text-sm font-bold"
          >
            Seguir
          </button>
        </div>

        {/* comentários */}
      </div>

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
    </section>
  );
};
