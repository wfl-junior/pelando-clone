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
}) => (
  <Menu.Item
    as="button"
    type="button"
    className={({ active }) => {
      return classNames(
        "py-3 px-4 transition-colors",
        props.disabled
          ? "bg-inactive-background cursor-not-allowed"
          : "bg-default-background",
        {
          "font-bold": fontBold,
          "bg-secondary-foreground/10": active,
        },
        className,
      );
    }}
    {...props}
  >
    {children}
  </Menu.Item>
);
