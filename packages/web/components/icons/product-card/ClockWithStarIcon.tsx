import { Icon } from "@/@types/app";
import React from "react";

export const ClockWithStarIcon: Icon = props => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 12C2 6.48 6.47 2 11.99 2 17.52 2 22 6.48 22 12s-4.48 10-10.01 10c-.334 0-.664-.016-.99-.049v-2.013A7.998 7.998 0 0 0 20 12c0-4.42-3.58-8-8-8a7.998 7.998 0 0 0-7.938 9H2.049A10.318 10.318 0 0 1 2 12z"></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m6 20.375-2.425 1.534c-.444.282-.987-.134-.87-.66l.642-2.886-2.144-1.944c-.392-.355-.181-1.027.333-1.07l2.822-.25 1.104-2.728a.575.575 0 0 1 1.076 0l1.104 2.721 2.822.25c.514.044.725.716.333 1.07l-2.144 1.945.643 2.886c.116.526-.427.942-.871.66L6 20.375zM12 6a1 1 0 0 1 1 1v4.946l3.53 2.206a1 1 0 0 1-1.06 1.696L11 13.054V7a1 1 0 0 1 1-1z"
    ></path>
  </svg>
);