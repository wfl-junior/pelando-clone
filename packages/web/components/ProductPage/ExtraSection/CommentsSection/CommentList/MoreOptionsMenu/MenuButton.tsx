import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";

interface MenuButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  fontBold?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  fontBold = true,
  className,
  ...props
}) => {
  return (
    <Menu.Item
      as="button"
      type="button"
      className={classNames(
        "bg-default-background hover:bg-secondary-foreground/10 py-3 px-4 transition-colors",
        { "font-bold": fontBold },
        className,
      )}
      {...props}
    >
      {children}
    </Menu.Item>
  );
};
