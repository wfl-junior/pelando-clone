import { Product } from "@/@types/api";
import { ClockIcon } from "@/components/icons/product-card/ClockIcon";
import { ClockWithStarIcon } from "@/components/icons/product-card/ClockWithStarIcon";
import { getReadableDate } from "@/utils/getReadableDate";
import Link from "next/link";
import React from "react";

interface StoreAndTimeSectionProps {
  createdAt: Product["createdAt"];
  store: Product["store"];
  highlight?: boolean;
}

export const StoreAndTimeSection: React.FC<StoreAndTimeSectionProps> = ({
  createdAt,
  store,
  highlight,
}) => (
  <div className="text-secondary-foreground flex items-center justify-between text-sm">
    <p>
      <span className="hidden md:inline-block">vendido por&nbsp;</span>
      <Link href="#">
        <a className="md:text-default-foreground md:hover:text-tertiary-foreground transition-colors md:font-bold">
          {store.name}
        </a>
      </Link>
    </p>

    <time
      dateTime={new Date(createdAt).toISOString()}
      className="flex items-center gap-1"
      title="Hora da publicação"
    >
      {highlight ? (
        <ClockWithStarIcon className="w-3.5" />
      ) : (
        <ClockIcon className="w-3.5" />
      )}
      <span>{getReadableDate(createdAt)}</span>
    </time>
  </div>
);
