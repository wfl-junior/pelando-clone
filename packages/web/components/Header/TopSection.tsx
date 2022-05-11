import Link from "next/link";
import React from "react";
import { HamburguerIcon } from "../icons/HamburguerIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { Logo } from "../Logo";

export const TopSection: React.FC = () => (
  <div className="flex justify-between gap-14 pt-3">
    <div className="flex items-center gap-4">
      <button className="cursor-pointer">
        <HamburguerIcon className="w-6" />
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

      <button className="absolute inset-y-0 right-1.5 cursor-pointer rounded-full">
        <SearchIcon className="w-6" />
      </button>
    </div>

    <div>
      <button className="bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors">
        Cadastrar
      </button>
    </div>
  </div>
);
