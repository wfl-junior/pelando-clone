import { HamburguerIcon } from "@/components/icons/HamburguerIcon";
import { Logo } from "@/components/Logo";
import { useModalContext } from "@/contexts/ModalContext";
import { useSidebarContext } from "@/contexts/SidebarContext";
import Link from "next/link";
import React from "react";
import { SearchBar } from "./SearchBar";

export const TopSection: React.FC = () => {
  const { setOpen } = useSidebarContext();
  const { toggleModal } = useModalContext();

  return (
    <div className="xs:gap-2 relative flex items-center gap-1 md:justify-between md:gap-14">
      <div className="flex flex-grow items-center gap-4 md:flex-grow-0">
        <button
          className="hidden cursor-pointer md:block"
          onClick={() => setOpen(open => !open)}
        >
          <HamburguerIcon className="w-6" />
        </button>

        <Link href="/">
          <a>
            <Logo className="w-28" />
          </a>
        </Link>
      </div>

      <SearchBar />

      <button
        className="bg-primary hover:bg-primary-hover flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 font-bold text-white transition-colors"
        onClick={() => toggleModal(true, "register-login")}
      >
        Cadastrar
      </button>
    </div>
  );
};
