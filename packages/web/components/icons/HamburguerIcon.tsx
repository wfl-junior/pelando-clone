import { Icon } from "@/@types/app";
import React from "react";

export const HamburguerIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M50 75H250C256.875 75 262.5 80.625 262.5 87.5S256.875 100 250 100H50C43.125 100 37.5 94.375 37.5 87.5S43.125 75 50 75zM50 137.5H250C256.875 137.5 262.5 143.125 262.5 150S256.875 162.5 250 162.5H50C43.125 162.5 37.5 156.875 37.5 150S43.125 137.5 50 137.5zM37.5 212.5C37.5 205.625 43.125 200 50 200H250C256.875 200 262.5 205.625 262.5 212.5S256.875 225 250 225H50C43.125 225 37.5 219.375 37.5 212.5z"
    />
  </svg>
);
