import classNames from "classnames";
import React from "react";

interface BasicLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children?: React.ReactNode;
}

export const BasicLink: React.FC<BasicLinkProps> = ({
  children,
  className,
  ...props
}) => (
  <a
    className={classNames(
      "text-primary dark:text-dark-primary hover:text-primary-hover dark:hover:text-dark-primary-hover underline transition-colors",
      className,
    )}
    {...props}
  >
    {children}
  </a>
);
