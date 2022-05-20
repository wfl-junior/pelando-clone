import { Icon } from "@/@types/app";
import classNames from "classnames";
import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  iconPosition?: "left" | "right";
  Icon: Icon;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  iconPosition = "left",
  Icon,
  ...props
}) => (
  <button
    className={classNames(
      "relative w-full rounded-full border py-1.5 px-4 font-bold transition-colors",
      className,
    )}
    {...props}
  >
    <Icon
      className={classNames(
        "absolute top-1/2 w-5 -translate-y-1/2 transform",
        iconPosition === "left" ? "left-1.5" : "right-1.5",
      )}
    />

    {children}
  </button>
);
