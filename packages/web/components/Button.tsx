import classNames from "classnames";
import React from "react";

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, className, ...props }) => (
  <button
    className={classNames(
      "bg-primary hover:bg-primary-hover disabled:bg-inactive-background disabled:text-secondary-foreground flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors disabled:cursor-not-allowed",
      className,
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);
