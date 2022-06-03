import { Icon } from "@/@types/app";
import React from "react";

export const ClockIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M149.875 275C80.875 275 25 219 25 150S80.875 25 149.875 25C219 25 275 81 275 150S219 275 149.875 275zM150 50C94.75 50 50 94.75 50 150S94.75 250 150 250S250 205.25 250 150S205.25 50 150 50zM162.5 212.5A12.5 12.5 0 1 1 137.5 212.5V136.825L193.375 101.9A12.5 12.5 0 0 1 206.625 123.1L162.5 150.675V212.5z"
    />
  </svg>
);
