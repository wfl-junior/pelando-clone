import { ChevronLeftIcon } from "@/components/icons/header/nav/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/header/nav/ChevronRight";
import classNames from "classnames";
import React from "react";

interface ScrollButtonProps {
  type: "left" | "right";
  listElementRef: React.RefObject<HTMLUListElement>;
  updateButtonsVisibility: () => void;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  type,
  listElementRef,
  updateButtonsVisibility,
}) => {
  const isLeft = type === "left";
  const Chevron = isLeft ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      className={classNames(
        "bg-default-background before:from-default-background before:to-default-background/0 absolute z-10 flex h-full w-7 items-center justify-center before:absolute before:inset-y-0 before:w-full sm:w-8 md:w-10",
        isLeft
          ? "left-0 before:left-full before:bg-gradient-to-r"
          : "right-0 before:right-full before:bg-gradient-to-l",
      )}
      onClick={() => {
        // Aqui a ref já vai ter inicializado
        const el = listElementRef.current!;
        const newPosition = isLeft
          ? // Math.max para left para impedir que seja menor que 0
            Math.max(el.scrollLeft - el.offsetWidth, 0)
          : // Math.min para right para impedir que seja maior que scrollWidth
            Math.min(el.scrollLeft + el.offsetWidth, el.scrollWidth);

        el.scrollTo({ left: newPosition, behavior: "smooth" });
        updateButtonsVisibility();
      }}
    >
      <Chevron className="w-6 sm:w-7 md:w-8" />
    </button>
  );
};
