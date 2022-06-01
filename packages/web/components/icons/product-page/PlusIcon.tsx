import { Icon } from "@/@types/app";
import React from "react";

export const PlusIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M225 137.5H162.5V75C162.5 68.125 156.875 62.5 150 62.5S137.5 68.125 137.5 75V137.5H75C68.125 137.5 62.5 143.125 62.5 150S68.125 162.5 75 162.5H137.5V225C137.5 231.875 143.125 237.5 150 237.5S162.5 231.875 162.5 225V162.5H225C231.875 162.5 237.5 156.875 237.5 150S231.875 137.5 225 137.5z"
    />
  </svg>
);
