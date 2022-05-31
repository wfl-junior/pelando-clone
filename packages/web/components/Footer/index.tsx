import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Logo } from "../Logo";
import { footerLinks } from "./footerLinks";

export const Footer: React.FC = () => {
  const { route } = useRouter();

  if (!route.startsWith("/o")) {
    return null;
  }

  return (
    <footer className="bg-secondary-background border-default-border mt-auto border-t-2 py-6">
      <div className="container grid grid-cols-1 gap-x-8 md:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex-col gap-1.5 xl:col-span-2">
          <Logo className="w-28" />

          <p className="text-sm">
            <span className="font-bold">
              O Pelando é uma comunidade para quem gosta de economizar.
            </span>
            &nbsp;São 850.000 pessoas compartilhando promoções, descontos e bugs
            diariamente. Nosso time acompanha tudo de pertinho, verificando cada
            publicação e ajudando você a salvar aquela grana. Entre e faça
            parte, é gratuito.
          </p>
        </div>

        <ul className="mt-8 flex flex-col">
          {footerLinks.map(({ label, route }) => (
            <li key={label + route}>
              <Link href={route}>
                <a className="font-bold">{label}</a>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link href="#">
            <a className="font-bold">Central de Ajuda</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
