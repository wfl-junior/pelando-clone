import { ClockIcon } from "@/components/icons/product-card/ClockIcon";
import { ClockWithCommentIcon } from "@/components/icons/product-card/ClockWithCommentIcon";
import { ClockWithStarIcon } from "@/components/icons/product-card/ClockWithStarIcon";
import { ClockWithThermometerIcon } from "@/components/icons/product-card/ClockWithThermometerIcon";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { getReadableDate } from "@/utils/getReadableDate";
import { match } from "@/utils/match";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const StoreAndTimeSection: React.FC = () => {
  const { route } = useRouter();
  const { product } = useProductCardContext();

  const Icon = match(
    route,
    {
      "/": ClockWithStarIcon,
      "/mais-quentes": ClockWithThermometerIcon,
      "/comentadas": ClockWithCommentIcon,
    },
    ClockIcon,
  );

  return (
    <div className="text-secondary-foreground flex items-center justify-between text-sm">
      <p>
        <span className="hidden md:inline-block">vendido por&nbsp;</span>

        <Link href="#">
          <a className="md:text-default-foreground md:hover:text-tertiary-foreground transition-colors md:font-bold">
            {product.store.name}
          </a>
        </Link>
      </p>

      <div className="flex items-center gap-1" title="Hora da publicação">
        <Icon className="w-3.5" />

        <time dateTime={new Date(product.createdAt).toLocaleString()}>
          {getReadableDate(product.createdAt)}
        </time>
      </div>
    </div>
  );
};
