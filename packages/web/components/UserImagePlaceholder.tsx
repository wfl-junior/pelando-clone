import classNames from "classnames";
import React from "react";
import { UserIcon } from "./icons/sidebar/UserIcon";

export const UserImagePlaceholder: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={classNames(
      "bg-inactive-background flex aspect-square items-center justify-center rounded-full",
      className,
    )}
    {...props}
  >
    <UserIcon className="w-2/3" />
  </div>
);
