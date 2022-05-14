import { useSidebarContext } from "@/contexts/SidebarContext";
import classNames from "classnames";
import Link from "next/link";
import React, { Fragment } from "react";
import { navLinks } from "./navLinks";

export const AppBar: React.FC = () => {
  const { open, setOpen, appBarRef } = useSidebarContext();

  return (
    <nav
      ref={appBarRef}
      className="border-default-border dark:border-dark-default-border bg-default-background dark:bg-dark-default-background fixed inset-x-0 bottom-0 z-50 border-t px-4 py-1 md:hidden"
    >
      <ul className="flex items-center">
        {navLinks.map(({ label, route, Icon }, index) => {
          // TODO: transformar em rota ativa quando adicionar outras rotas
          const isActive = index === (open ? 3 : 0);
          const isHamburguer = index === 3;

          const buttonLinkClassName =
            "flex h-full w-full flex-col items-center";

          const children = (
            <Fragment>
              <Icon
                className={classNames("w-6 transition-colors", {
                  "text-primary dark:text-dark-primary": isActive,
                })}
              />

              <span className="text-sm">{label}</span>
            </Fragment>
          );

          return (
            <li key={label + route} className="flex-grow">
              {isHamburguer ? (
                <button
                  className={buttonLinkClassName}
                  onClick={() => setOpen(open => !open)}
                >
                  {children}
                </button>
              ) : (
                <Link href={route}>
                  <a className={buttonLinkClassName}>{children}</a>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
