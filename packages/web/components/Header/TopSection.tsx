import Link from "next/link";
import React from "react";
import { HamburguerIcon } from "../icons/HamburguerIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { Logo } from "../Logo";

export const TopSection: React.FC = () => (
  <div className="xs:gap-2 flex gap-1 pt-2 sm:pt-3 md:justify-between md:gap-14">
    <div className="flex flex-grow items-center gap-4 md:flex-grow-0">
      <button className="hidden cursor-pointer md:block">
        <HamburguerIcon className="w-6" />
      </button>

      <Link href="/">
        <a>
          <Logo className="w-28" />
        </a>
      </Link>
    </div>

    <div className="relative md:my-auto md:flex-grow">
      <input
        type="text"
        className="bg-input-background dark:bg-dark-input-background hidden w-full rounded-full py-1.5 pr-9 pl-4 focus:outline-none md:block"
        placeholder="Procure por promoções ou lojas"
        autoComplete="off"
      />

      <button className="bg-input-background dark:bg-dark-input-background absolute right-1 flex aspect-square w-9 cursor-pointer items-center justify-center rounded-full md:inset-y-0">
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
