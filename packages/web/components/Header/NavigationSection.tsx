import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { navLinks } from "./navLinks";

export const NavigationSection: React.FC = () => (
  <nav>
    <ul className="no-scrollbar flex items-center justify-between gap-1 overflow-x-auto">
      {navLinks.map(({ label, route, Icon }, index) => {
        // TODO: trocar isActive para comparação de rotas depois que adicionar outras páginas
        const isActive = index === 1;
        const isFirstIteration = index === 0;

        return (
          <li key={label + route}>
            <Link href={route}>
              <a
                className={classNames(
                  "hover:text-primary-hover dark:hover:text-dark-primary-hover flex flex-col items-center gap-0.5 p-2 transition-colors",
                  {
                    "text-primary dark:text-dark-primary before:bg-primary dark:before:bg-dark-primary relative before:absolute before:inset-x-0 before:bottom-0 before:h-1":
                      isActive,
                    // adicionar separador se for a primeira iteração
                    "before:bg-default-border dark:before:bg-dark-default-border relative before:absolute before:right-0 before:h-[70%] before:w-[1px]":
                      isFirstIteration,
                  },
                )}
              >
                <Icon className="w-6" />
                <span className="whitespace-nowrap text-sm font-bold">
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
