import { ChevronLeftIcon } from "@/components/icons/header/nav/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/header/nav/ChevronRight";
import classNames from "classnames";
import React, { useRef } from "react";

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLeft = type === "left";
  const Chevron = isLeft ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      ref={buttonRef}
      className={classNames(
        "bg-default-background before:from-default-background before:to-default-background/0 absolute z-10 flex h-full w-7 items-center justify-center before:absolute before:inset-y-0 before:w-full sm:w-8 md:w-10",
        isLeft
          ? "left-0 before:left-full before:bg-gradient-to-r"
          : "right-0 before:right-full before:bg-gradient-to-l",
      )}
      onClick={() => {
        // Aqui a ref já vai ter inicializado
        const container = listElementRef.current!;
        const button = buttonRef.current!;

        // (button + before) * 2 para que todos os links sejam acessíveis ao rolar, para não pular links por trás do button
        const widthToMove = container.offsetWidth - button.offsetWidth * 4;

        const newPosition = isLeft
          ? // Math.max para left para impedir que seja menor que 0
            Math.max(container.scrollLeft - widthToMove, 0)
          : // Math.min para right para impedir que seja maior que scrollWidth
            Math.min(container.scrollLeft + widthToMove, container.scrollWidth);

        container.scrollTo({ left: newPosition, behavior: "smooth" });
        updateButtonsVisibility();
      }}
    >
      <Chevron className="w-6 sm:w-7 md:w-8" />
    </button>
  );
};
