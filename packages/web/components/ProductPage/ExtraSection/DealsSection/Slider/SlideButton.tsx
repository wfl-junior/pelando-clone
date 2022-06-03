import { AngleDownIcon } from "@/components/icons/header/top/AngleDownIcon";
import classNames from "classnames";
import React from "react";

interface SlideButtonProps {
  direction: "left" | "right";
  sliderRef: React.RefObject<HTMLDivElement>;
}

export const SlideButton: React.FC<SlideButtonProps> = ({
  direction,
  sliderRef,
}) => (
  <button
    type="button"
    className={classNames(
      "group absolute inset-y-0 z-10 hidden w-8 items-center justify-center lg:flex",
      direction === "left" ? "left-0" : "right-0",
    )}
    style={{
      background: `
        linear-gradient(
          to ${direction},
          rgb(var(--color-secondary-background) / 0),
          rgb(var(--color-secondary-background)) 35%
        )
      `,
    }}
    onClick={() => {
      const slider = sliderRef.current!;
      const { offsetWidth, scrollWidth } = slider;

      const translateXProperty = "--tw-translate-x";

      const translateX = +getComputedStyle(slider)
        .getPropertyValue(translateXProperty)
        .replace("px", "");

      const widthToMove =
        direction === "right"
          ? Math.max(translateX - offsetWidth, (scrollWidth - offsetWidth) * -1)
          : Math.min(translateX + offsetWidth, 0);

      slider.style.setProperty(translateXProperty, `${widthToMove}px`);
    }}
  >
    <div className="bg-default-background group-hover:text-primary flex aspect-square w-full items-center justify-center rounded-full shadow transition-colors">
      <AngleDownIcon
        className={classNames(
          "w-3/4",
          direction === "left" ? "rotate-90" : "-rotate-90",
        )}
      />
    </div>
  </button>
);
