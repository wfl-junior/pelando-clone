import { Icon } from "@/@types/app";
import React from "react";

export const ChevronLeftIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M183.875 216.125A12.45 12.45 0 0 1 166.25 216.125L108.875 158.75A12.45 12.45 0 0 1 108.875 141.125L166.25 83.75A12.45 12.45 0 1 1 183.875 101.375L135.375 150L183.875 198.5C188.75 203.375 188.625 211.375 183.875 216.125z"
    />
  </svg>
);
