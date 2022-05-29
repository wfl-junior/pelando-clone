import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "./navLinks";
import { ScrollButton } from "./ScrollButton";

export const NavigationSection: React.FC = () => {
  const router = useRouter();
  const listElementRef = useRef<HTMLUListElement>(null);
  const [shouldShowLeftScrollButton, setShouldShowLeftScrollButton] =
    useState(false);
  const [shouldShowRightScrollButton, setShouldShowRightScrollButton] =
    useState(true);

  const updateButtonsVisibility = useCallback(() => {
    // Aqui a ref já vai ter inicializado
    const el = listElementRef.current!;

    // Mostrar button de scroll para esquerda somente se posição left for maior que 0
    setShouldShowLeftScrollButton(el.scrollLeft > 0);

    // Mostrar button de scroll para direita somente se listElement tiver overflow
    setShouldShowRightScrollButton(
      el.offsetWidth + el.scrollLeft !== el.scrollWidth,
    );
  }, []);

  useEffect(() => {
    updateButtonsVisibility();

    window.addEventListener("resize", updateButtonsVisibility);
    window.addEventListener("orientationchange", updateButtonsVisibility);

    return () => {
      window.removeEventListener("resize", updateButtonsVisibility);
      window.removeEventListener("orientationchange", updateButtonsVisibility);
    };
  }, []);

  return (
    <nav className="relative">
      {shouldShowLeftScrollButton && (
        <ScrollButton
          type="left"
          listElementRef={listElementRef}
          updateButtonsVisibility={updateButtonsVisibility}
        />
      )}

      {shouldShowRightScrollButton && (
        <ScrollButton
          type="right"
          listElementRef={listElementRef}
          updateButtonsVisibility={updateButtonsVisibility}
        />
      )}

      <ul
        ref={listElementRef}
        className="no-scrollbar flex items-center justify-between gap-1 overflow-x-auto"
        onScroll={() => updateButtonsVisibility()}
      >
        {navLinks.map(({ label, route, Icon }, index) => {
          const isActive = router.route === route;
          const isFirstIteration = index === 0;

          return (
            <li key={label + route}>
              <Link href={route}>
                <a
                  className={classNames(
                    "hover:text-primary-hover flex flex-col items-center gap-0.5 p-3 transition-colors md:p-2",
                    {
                      "text-primary before:bg-primary relative before:absolute before:inset-x-0 before:bottom-0 before:h-1":
                        isActive,
                      // adicionar separador se for a primeira iteração
                      "before:bg-default-border relative before:absolute before:right-0 before:h-[70%] before:w-[1px]":
                        isFirstIteration,
                    },
                  )}
                >
                  <Icon className="w-6" />
                  <span className="hidden whitespace-nowrap text-sm font-bold md:inline-block">
                    {label}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
