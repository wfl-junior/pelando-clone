import { AdSkeleton } from "@/components/AdSkeleton";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import Link from "next/link";
import React, { Fragment } from "react";
import { CommentButton } from "../ProductSection/ActionSection/CommentButton";
import { CouponButton } from "../ProductSection/ActionSection/CouponButton";
import { LinkButton } from "../ProductSection/ActionSection/LinkButton";
import { ShareButton } from "../ProductSection/ActionSection/ShareButton";
import { TemperatureSection } from "../ProductSection/ActionSection/TemperatureSection";

export const SidebarSection: React.FC = () => {
  const { store, title, price } = useProductForProductPage();

  return (
    <section
      className="hidden flex-col gap-2 lg:sticky lg:top-[4.5rem] lg:flex lg:flex-col lg:gap-2"
      style={{ gridArea: "sidebar" }}
    >
      <div className="bg-default-background border-default-border flex flex-col gap-2 rounded-lg border p-4">
        <div className="flex items-center gap-2 font-bold">
          <Link href="#">
            <a className="text-secondary-foreground text-sm">{store.name}</a>
          </Link>

          <div className="bg-inactive-background flex items-center gap-1 rounded-full py-px pr-1.5 pl-1 text-[10px] uppercase md:py-0.5 md:pr-2 md:text-xs">
            <CheckIcon className="w-2.5 md:w-3" />
            <span>Loja Verificada</span>
          </div>
        </div>

        <h2 className="text-lg font-bold">{title}</h2>

        <div className="text-primary text-2xl font-bold">
          {price > 0 ? (
            <Fragment>
              <small>R$</small>
              {price}
            </Fragment>
          ) : (
            "Grátis"
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <CouponButton />
          <LinkButton />
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] place-items-center gap-4">
          <CommentButton />
          <TemperatureSection />
          <ShareButton />
        </div>
      </div>

      <AdSkeleton className="h-[250px]" aria-hidden="true" />
    </section>
  );
};
