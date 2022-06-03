import { Icon } from "@/@types/app";
import React from "react";

export const SearchIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M193.75 125H183.875L180.375 128.375A80.8875 80.8875 0 0 1 200 181.25A81.25 81.25 0 1 1 118.75 100C138.875 100 157.375 107.375 171.625 119.625L175 116.125V106.25L237.5 43.875L256.125 62.5L193.75 125zM118.75 125C87.625 125 62.5 150.125 62.5 181.25S87.625 237.5 118.75 237.5S175 212.375 175 181.25S149.875 125 118.75 125z"
    />
  </svg>
);
