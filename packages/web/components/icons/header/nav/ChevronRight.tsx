import { Icon } from "@/@types/app";
import React from "react";

export const ChevronRightIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M116.125 216.125A12.45 12.45 0 0 1 116.125 198.5L164.625 150L116.125 101.5A12.45 12.45 0 1 1 133.75 83.875L191.125 141.25A12.45 12.45 0 0 1 191.125 158.875L133.75 216.25C129 221 121 221 116.125 216.125z"
    />
  </svg>
);
