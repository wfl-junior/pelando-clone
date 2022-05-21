import { BellIcon } from "@/components/icons/header/top/BellIcon";
import React from "react";

export const NotificationsButton: React.FC = () => (
  <button
    type="button"
    className="bg-inactive-background flex aspect-square w-9 items-center justify-center rounded-full"
  >
    <BellIcon className="w-6" />
  </button>
);
