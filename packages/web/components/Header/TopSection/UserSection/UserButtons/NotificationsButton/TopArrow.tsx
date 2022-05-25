import React from "react";

export const TopArrow: React.FC = () => (
  <div
    aria-hidden="true"
    className="before:bg-default-background before:shadow-notifications absolute -top-4 right-0 h-4 w-9 overflow-hidden bg-transparent before:absolute before:top-1/2 before:left-2.5 before:aspect-square before:w-4 before:rotate-45 before:rounded"
  ></div>
);
