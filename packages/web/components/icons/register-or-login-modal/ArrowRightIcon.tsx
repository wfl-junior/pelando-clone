import React from "react";

export const ArrowRightIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M62.5 137.5H202.125L141.125 76.5C136.25 71.625 136.25 63.625 141.125 58.75C146 53.875 153.875 53.875 158.75 58.75L241.1250000000001 141.125A12.45 12.45 0 0 1 241.1250000000001 158.75L158.875 241.2500000000001A12.45 12.45 0 1 1 141.25 223.625L202.125 162.5H62.5C55.625 162.5 50 156.875 50 150S55.625 137.5 62.5 137.5z"
    />
  </svg>
);
