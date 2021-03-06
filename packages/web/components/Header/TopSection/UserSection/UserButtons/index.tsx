import { AlertasIcon } from "@/components/icons/appbar/AlertasIcon";
import { PostarIcon } from "@/components/icons/appbar/PostarIcon";
import Link from "next/link";
import React from "react";
import { MenuButton } from "./MenuButton";
import { NotificationsButton } from "./NotificationsButton";

export const UserButtons: React.FC = () => (
  <div className="flex items-center gap-2">
    <Link href="#">
      <a className="hover:text-primary hidden items-center gap-0.5 py-1.5 px-1 font-bold transition-colors md:flex">
        <PostarIcon className="w-6" />
        <span className="sr-only lg:not-sr-only">Postar</span>
      </a>
    </Link>

    <Link href="#">
      <a className="hover:text-primary hidden items-center gap-0.5 py-1.5 px-1 font-bold transition-colors md:flex">
        <AlertasIcon className="w-6" />
        <span className="sr-only lg:not-sr-only">Alertas</span>
      </a>
    </Link>

    <NotificationsButton />
    <MenuButton />
  </div>
);
