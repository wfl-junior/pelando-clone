import { HamburguerIcon } from "@/components/icons/header/top/HamburguerIcon";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { SearchBar } from "./SearchBar";

export const TopSection: React.FC = () => (
  <div className="xs:gap-2 relative flex items-center gap-1 pt-2 sm:pt-3 md:justify-between md:gap-14">
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

    <SearchBar />

    <button className="bg-primary dark:bg-dark-primary hover:bg-primary-hover dark:hover:bg-dark-primary-hover flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors">
      Cadastrar
    </button>
  </div>
);
