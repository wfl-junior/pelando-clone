import { Product } from "@/@types/api";
import { getReadableDate } from "@/utils/getReadableDate";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { CartIcon } from "../icons/product-card/CartIcon";
import { ClockIcon } from "../icons/product-card/ClockIcon";
import { ClockWithStarIcon } from "../icons/product-card/ClockWithStarIcon";
import { CommentIcon } from "../icons/product-card/CommentIcon";
import { EsfriarIcon } from "../icons/product-card/EsfriarIcon";
import { EsquentarIcon } from "../icons/product-card/EsquentarIcon";

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  highlight,
}) => (
  <div className="bg-default-background border-default-border grid-template-areas-product-card grid w-full grid-cols-[120px_auto] rounded border py-2 shadow-md md:w-3/4 lg:grid-cols-[156px_auto]">
    {/* image area */}
    <div className="pl-2 pb-2" style={{ gridArea: "image" }}>
      <Link href="#">
        <a className="border-default-border block aspect-square w-full overflow-hidden rounded border">
          <Image
            src={product.image}
            alt={`Imagem do produto ${product.title} da loja ${product.store.name}`}
            className="w-full object-contain"
            width="156"
            height="156"
          />
        </a>
      </Link>
    </div>

    {/* content area */}
    <div className="px-2 pr-2 md:px-4" style={{ gridArea: "content" }}>
      {/* store & time */}
      <div className="text-secondary-foreground flex items-center justify-between text-sm">
        <p>
          <span className="hidden md:inline-block">vendido por&nbsp;</span>
          <Link href="#">
            <a className="md:text-default-foreground md:hover:text-tertiary-foreground transition-colors md:font-bold">
              {product.store.name}
            </a>
          </Link>
        </p>

        <time
          dateTime={new Date(product.createdAt).toISOString()}
          className="flex items-center gap-1"
          title="Hora da publicação"
        >
          {highlight ? (
            <ClockWithStarIcon className="w-3.5" />
          ) : (
            <ClockIcon className="w-3.5" />
          )}
          <span>{getReadableDate(product.createdAt)}</span>
        </time>
      </div>

      {/* title */}
      <Link href="#">
        <a className="hover:text-tertiary-foreground mt-2 block font-bold transition-colors lg:text-xl">
          {product.title}
        </a>
      </Link>

      {/* price */}
      <p className="text-primary md:text-2.5xl mt-1 text-2xl font-bold">
        {product.price > 0 ? (
          <Fragment>
            <small className="text-[75%] md:text-[72%]">R$</small>
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Fragment>
        ) : (
          <Fragment>Grátis</Fragment>
        )}
      </p>
    </div>

    {/* action area */}
    <div
      className="border-default-border mt-auto flex items-center justify-between border-t px-2 pt-3 lg:pl-4"
      style={{ gridArea: "action" }}
    >
      {/* temperature */}
      <div className="border-default-border flex items-center gap-1 rounded-full border bg-transparent p-1.5">
        <button
          title="Esfriar"
          className="hover:bg-secondary-background hover:text-blue flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
        >
          <EsfriarIcon className="w-4.5" />
        </button>

        <span
          className={classNames("font-bold", {
            "text-primary":
              product.temperature >= 350 && product.temperature < 1000,
            "text-red": product.temperature >= 1000,
          })}
        >
          {Math.floor(product.temperature)}º
        </span>

        <button
          title="Esquentar"
          className="hover:bg-secondary-background hover:text-primary flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
        >
          <EsquentarIcon className="w-5" />
        </button>
      </div>

      {/* comments & cart */}
      <div className="flex items-center gap-2 text-sm font-bold md:gap-6">
        <Link href="#">
          <a className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors">
            <CommentIcon className="w-4" />
            {/* TODO: adicionar commentCount */}
            <span>0</span>
          </a>
        </Link>

        <a
          href={product.sourceUrl}
          target="_blank"
          className="hover:text-tertiary-foreground flex items-center gap-1 p-2 transition-colors"
        >
          <CartIcon className="w-4" />
          <span>ver na loja</span>
        </a>
      </div>
    </div>
  </div>
);
