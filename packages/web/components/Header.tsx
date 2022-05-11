import { MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

export const Header: React.FC = () => (
  <header className="container sticky top-0 flex justify-between gap-14 py-3">
    <div className="flex items-center gap-4">
      <button>
        <MenuIcon className="w-6" />
      </button>

      <Link href="/">
        <a>
          <Logo className="w-28" />
        </a>
      </Link>
    </div>

    <div className="relative my-auto flex-grow">
      <input
        type="text"
        className="bg-input-background dark:bg-dark-input-background w-full rounded-full py-1.5 pr-9 pl-4 focus:outline-none"
        placeholder="Procure por promoções ou lojas"
        autoComplete="off"
      />

      <button className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full">
        <SearchIcon className="w-5" />
      </button>
    </div>

    <div>
      <button className="bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors">
        Cadastrar
      </button>
    </div>
  </header>
);
