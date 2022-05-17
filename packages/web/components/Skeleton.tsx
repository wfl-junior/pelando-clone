import classNames from "classnames";
import React from "react";

interface SkeletonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  border?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  children,
  border,
  ...props
}) => (
  <div
    className={classNames("bg-inactive-background rounded-full", className, {
      "border-inactive-background border": border,
    })}
    {...props}
  >
    {children}
  </div>
);
