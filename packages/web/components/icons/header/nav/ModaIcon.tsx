import { Icon } from "@/@types/app";
import React from "react";

export const ModaIcon: Icon = props => (
  <svg viewBox="0 0 300 300" fill="currentColor" {...props}>
    <path
      transform="matrix(1 0 0 -1 0 300)"
      d="M262.1125 100.3875L165.2375 163.275L174.225 169.15A44.525 44.525 0 0 1 193.75 206.25C193.75 230.075 173.825 250 150 250C125.775 250 106.25 230.075 106.25 206.25C106.25 200.775 110.1625 196.875 115.625 196.875A9.25 9.25 0 0 1 125 206.25C125 219.925 135.9375 231.25 150 231.25C163.675 231.25 175 219.925 175 205.8625C175 197.2625 170.7 189.45 163.675 184.7625L37.1125 100.3875C29.3 95.3125 25 86.7125 25 77.3375C25 62.125 37.1125 50 52.35 50H247.25C262.5 50 275 62.1125 275 77.35C275 86.725 269.925 95.3125 262.1125 100.3875zM247.25 68.75H52.35A8.75 8.75 0 0 0 43.75 77.7375C43.75 80.8625 44.925 83.5875 47.6625 85.15L148.4375 152.3375L251.95 85.1625C254.6875 83.2 256.25 80.475 256.25 77.35C256.25 72.6625 251.95 68.7500000000001 247.2625 68.7500000000001z"
    />
  </svg>
);
