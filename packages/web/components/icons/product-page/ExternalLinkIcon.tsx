import { Icon } from "@/@types/app";
import React from "react";

export const ExternalLinkIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M237.5 62.5H62.5V237.5H150V262.5H62.5A25 25 0 0 1 37.5 237.5V62.5A25 25 0 0 1 62.5 37.5H237.5C251.2500000000001 37.5 262.5 48.75 262.5 62.5V150H237.5V62.5zM175 262.5V237.5H219.875L97 114.625L114.625 97L237.5 219.875V175H262.5V262.5H175z"
    />
  </svg>
);
