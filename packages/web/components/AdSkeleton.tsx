import classNames from "classnames";
import React from "react";

export const AdSkeleton: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={classNames("bg-inactive-background rounded", className)}
    {...props}
  ></div>
);
