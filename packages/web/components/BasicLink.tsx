import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React from "react";

interface BasicLinkProps
  extends Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "href"
  > {
  href: LinkProps["href"];
  children?: React.ReactNode;
}

export const BasicLink: React.FC<BasicLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => (
  <Link href={href}>
    <a
      className={classNames(
        "text-primary hover:text-primary-hover underline transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  </Link>
);
