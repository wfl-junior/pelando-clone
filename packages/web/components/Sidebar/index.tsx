import { useSidebarContext } from "@/contexts/SidebarContext";
import { useIsBreakpoint } from "@/hooks/useIsBreakpoint";
import Link from "next/link";
import React, { useEffect } from "react";
import { ArrowRightIcon } from "../icons/sidebar/ArrowRightIcon";
import { footerLinks } from "./footerLinks";
import { navBottomLinks } from "./navBottomLinks";
import { navLinks } from "./navLinks";
import { RegisterOrLogoutButton } from "./RegisterOrLogoutButton";
import { storeLinks } from "./storeLinks";
import { ThemeTogglerButton } from "./ThemeTogglerButton";
import { UserSection } from "./UserSection";

export const Sidebar: React.FC = () => {
  const { open, setOpen, appBarRef } = useSidebarContext();
  const isMediumBreakpoint = useIsBreakpoint("md");

  // para fechar com keydown esc
  useEffect(() => {
    if (open) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "escape") {
          setOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black/75"
      onClick={e => {
        // para fechar se clicar na overlay
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
      style={
        isMediumBreakpoint
          ? undefined
          : {
              height: `calc(100vh - ${appBarRef.current?.offsetHeight || 0}px)`,
            }
      }
    >
      <aside className="bg-default-background animate-slide-left-in absolute left-0 top-0 flex h-full w-full flex-col md:w-72">
        <div className="text-default-foreground flex h-full flex-col gap-3 p-4">
          <UserSection />

          <nav>
            <ul className="flex flex-col">
              {navLinks.map(({ label, route }) => (
                <li key={label + route}>
                  <Link href={route}>
                    <a className="border-default-border block border-b py-3.5 font-bold">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}

              <li>
                <div className="py-3.5 font-bold">Lojas</div>

                <div className="pl-2">
                  <ul className="grid grid-cols-2">
                    {storeLinks.map(({ label, route }) => (
                      <li key={label + route}>
                        <Link href={route}>
                          <a className="block p-2 text-sm">{label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link href="#">
                    <a className="flex gap-1 p-2 text-sm font-bold">
                      <span>ver todas</span>{" "}
                      <ArrowRightIcon className="w-3.5" />
                    </a>
                  </Link>
                </div>
              </li>
            </ul>
          </nav>

          <ul className="mt-auto flex flex-col">
            {navBottomLinks.map(({ label, route }) => (
              <li key={label + route}>
                <Link href={route}>
                  <a className="border-default-border block border-t py-3.5 font-bold">
                    {label}
                  </a>
                </Link>
              </li>
            ))}

            <li className="border-default-border flex items-center justify-between border-t pt-3.5">
              <ThemeTogglerButton />
              <RegisterOrLogoutButton />
            </li>
          </ul>
        </div>

        <footer className="bg-secondary-background mt-auto py-1.5">
          <ul className="flex flex-wrap items-center justify-center text-xs">
            {footerLinks.map(({ label, route }) => (
              <li
                key={label + route}
                className="text-default-foreground my-1 mx-1.5"
              >
                <Link href={route}>
                  <a>{label}</a>
                </Link>
              </li>
            ))}

            <li className="text-secondary-foreground">
              &copy; Copyright Pelando
            </li>
          </ul>
        </footer>
      </aside>
    </div>
  );
};
