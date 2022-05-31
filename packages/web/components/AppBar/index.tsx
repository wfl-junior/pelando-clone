import { useSidebarContext } from "@/contexts/SidebarContext";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { navLinks } from "./navLinks";

export const AppBar: React.FC = () => {
  const { route } = useRouter();
  const { open, setOpen, appBarRef } = useSidebarContext();

  if (route.startsWith("/o")) {
    return null;
  }

  return (
    <nav
      ref={appBarRef}
      className="border-default-border bg-default-background fixed inset-x-0 bottom-0 z-[25] border-t px-4 py-1 md:hidden"
    >
      <ul className="flex items-center">
        {navLinks.map(({ label, route, Icon }, index) => {
          // TODO: transformar em rota ativa quando adicionar as outras rotas
          const isActive = index === (open ? 3 : 0);
          const isHamburguer = index === 3;

          const buttonLinkClassName =
            "flex h-full w-full flex-col items-center";

          const children = (
            <Fragment>
              <Icon
                className={classNames("w-6 transition-colors", {
                  "text-primary": isActive,
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
