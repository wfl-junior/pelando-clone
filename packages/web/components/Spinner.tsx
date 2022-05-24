import classNames from "classnames";
import React from "react";

interface SpinnerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * css variable, rgb value
   */
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  color,
  className,
  ...props
}) => (
  <div
    aria-label="spinner"
    className={classNames(
      "before:bg-default-background flex aspect-square animate-spin items-center justify-center rounded-full before:aspect-square before:rounded-full",
      className,
    )}
    style={{
      animationDuration: "0.7s",
      background: `linear-gradient(to bottom, rgb(var(--color-${
        color?.replace("--color-", "") || "primary"
      })) 0%, transparent 85%)`,
    }}
    {...props}
  ></div>
);
