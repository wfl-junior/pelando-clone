import { Product } from "@/@types/api";
import { HotIcon } from "@/components/icons/product-card/HotIcon";
import { CommentIcon } from "@/components/icons/product-page/CommentIcon";
import { getReadableDate } from "@/utils/getReadableDate";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useRef, useState } from "react";
import { SlideButton } from "./SlideButton";

interface SliderProps {
  products: Product[];
}

export const Slider: React.FC<SliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [shouldShowLeftButton, setShouldShowLeftButton] = useState(false);
  const [shouldShowRightButton, setShouldShowRightButton] = useState(true);

  return (
    <div className="relative">
      {shouldShowLeftButton && (
        <SlideButton sliderRef={sliderRef} direction="left" />
      )}

      {shouldShowRightButton && (
        <SlideButton sliderRef={sliderRef} direction="right" />
      )}

      <div
        ref={sliderRef}
        className="grid snap-x snap-proximity grid-flow-col gap-2 overflow-x-auto lg:transform lg:overflow-x-visible lg:transition-transform lg:duration-1000"
        onTransitionEnd={() => {
          const slider = sliderRef.current!;
          const translateX = Math.abs(
            +getComputedStyle(slider)
              .getPropertyValue("--tw-translate-x")
              .replace("px", ""),
          );

          setShouldShowLeftButton(translateX > 0);
          setShouldShowRightButton(
            translateX + slider.offsetWidth !== slider.scrollWidth,
          );
        }}
      >
        {products.map(product => (
          <Link key={product.id} href={`/o/${product.id}`}>
            <a className="border-default-border bg-default-background w-44 snap-start rounded border shadow md:w-56">
              <div
                style={{
                  background: `
                  linear-gradient(
                    to bottom,
                    rgb(var(--color-default-background) / 0) 76%,
                    rgb(0 0 0 / 0.06)
                  )
                `,
                }}
              >
                <Image
                  src={product.image}
                  width={224}
                  height={112}
                  className="max-w-full object-contain"
                />
              </div>

              <div className="mt-1 flex flex-col gap-1 px-3 pb-1 text-xs md:pb-2 md:text-sm">
                <div className="text-secondary-foreground flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="text-primary flex items-center gap-1 font-bold">
                      <HotIcon className="w-3.5" />
                      {Math.floor(product.temperature)}º
                    </div>

                    <div className="flex items-center gap-0.5 font-bold">
                      <CommentIcon className="w-3.5" />0
                    </div>
                  </div>

                  <time dateTime={new Date(product.createdAt).toLocaleString()}>
                    {getReadableDate(product.createdAt)}
                  </time>
                </div>

                <h3
                  className="overflow-hidden overflow-ellipsis font-bold"
                  style={{
                    lineClamp: 2,
                    WebkitLineClamp: 2,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.title}
                </h3>

                <div className="text-base font-bold md:text-xl">
                  {product.price > 0 ? (
                    <Fragment>
                      <small>R$</small>
                      {product.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Fragment>
                  ) : (
                    "Grátis"
                  )}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
