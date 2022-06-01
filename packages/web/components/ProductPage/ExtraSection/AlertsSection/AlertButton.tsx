import { PlusIcon } from "@/components/icons/product-page/PlusIcon";
import React from "react";

interface AlertButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "title" | "className"
  > {
  title: string;
}

export const AlertButton: React.FC<AlertButtonProps> = ({
  title,
  ...props
}) => (
  <button
    type="button"
    className="bg-inactive-background flex items-center gap-1 whitespace-nowrap rounded-l-[1.125rem] rounded-r-lg p-2 text-xs font-bold"
    {...props}
  >
    <PlusIcon className="w-4" />
    <span>{title}</span>
  </button>
);
