import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AngleDownIcon } from "../../icons/header/top/AngleDownIcon";

export const DescriptionSection: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [shouldShowMoreButton, setShouldShowMoreButton] = useState(false);
  const [open, setOpen] = useState(false);
  const { body } = useProductForProductPage();

  const updateButtonVisibility = useCallback(() => {
    // Aqui a ref já vai ter inicializado
    const el = paragraphRef.current!;

    // Mostrar button de ver mais se o parágrafo estiver com overflow
    setShouldShowMoreButton(el.scrollHeight > el.offsetHeight);
  }, []);

  useEffect(() => {
    updateButtonVisibility();

    window.addEventListener("resize", updateButtonVisibility);
    window.addEventListener("orientationchange", updateButtonVisibility);

    return () => {
      window.removeEventListener("resize", updateButtonVisibility);
      window.removeEventListener("orientationchange", updateButtonVisibility);
    };
  }, []);

  return (
    <div
      className={!shouldShowMoreButton ? "pb-3" : undefined}
      style={{ gridArea: "description" }}
    >
      <p
        ref={paragraphRef}
        // break-all para prevenir quebra de layout
        className={classNames("mb-4 overflow-hidden break-all", {
          "max-h-[210px]": !open,
        })}
      >
        {body}
      </p>

      {shouldShowMoreButton && (
        <button
          onClick={() => setOpen(!open)}
          className={classNames(
            "border-default-border before:from-default-background before:border-default-border relative flex w-full cursor-pointer items-center justify-center gap-1 border-t p-3 text-sm font-bold before:pointer-events-none before:absolute before:-top-full before:h-full before:w-full before:border-b before:bg-gradient-to-t before:to-transparent",
            { "before:hidden": open },
          )}
        >
          <span>ver {open ? "menos" : "mais"}</span>
          <AngleDownIcon
            className={classNames("w-3.5", { "rotate-180": open })}
          />
        </button>
      )}
    </div>
  );
};
