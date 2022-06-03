import { Icon } from "@/@types/app";
import React from "react";

export const ArrowLeftIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M237.5 162.5H97.875L158.875 223.5C163.75 228.375 163.75 236.375 158.875 241.25A12.45 12.45 0 0 1 141.25 241.25L58.875 158.875A12.45 12.45 0 0 1 58.875 141.25L141.25 58.875A12.45 12.45 0 1 1 158.875 76.5L97.875 137.5H237.5C244.375 137.5 250 143.125 250 150S244.375 162.5 237.5 162.5z"
    />
  </svg>
);
