import { useIsBreakpoint } from "@/hooks/useIsBreakpoint";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";

interface Button {
  title: string;
  onClick?: () => void;
}

const buttons: Button[] = [
  { title: "A promoção acabou" },
  { title: "Spam ou promoção ofensiva" },
  { title: "Promoção duplicada" },
  { title: "Não é uma promoção" },
  { title: "Cancelar" },
];

export const MenuButton: React.FC = () => {
  const isMediumBreakpoint = useIsBreakpoint("md");

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="flex cursor-pointer flex-col gap-[0.1875rem] px-3.5 py-2">
            {Array.from({ length: 3 }, (_, i) => i).map(number => (
              <div
                key={number}
                className="bg-default-foreground aspect-square w-1 rounded-full"
                aria-hidden="true"
              />
            ))}
          </Menu.Button>

          <div
            className={classNames("z-40", {
              "fixed inset-0 flex items-center justify-center bg-black/75":
                !isMediumBreakpoint && open,
            })}
          >
            <Menu.Items
              className={classNames(
                "divide-default-border bg-default-background shadow-product-page-action-menu z-40 flex w-64 flex-col divide-y overflow-hidden rounded-lg",
                { "absolute right-0 translate-y-4": isMediumBreakpoint },
              )}
            >
              {buttons.map(({ title, onClick }, index) => (
                <Menu.Item
                  key={title}
                  as="button"
                  type="button"
                  onClick={onClick}
                  className={classNames(
                    "bg-default-background hover:bg-secondary-foreground/10 py-3 px-4 transition-colors",
                    { "font-bold": index !== buttons.length - 1 },
                  )}
                >
                  {title}
                </Menu.Item>
              ))}
            </Menu.Items>
          </div>
        </Fragment>
      )}
    </Menu>
  );
};
