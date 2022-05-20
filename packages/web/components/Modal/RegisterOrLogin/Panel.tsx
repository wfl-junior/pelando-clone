import { AppleIcon } from "@/components/icons/register-or-login-modal/AppleIcon";
import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRight";
import { FacebookIcon } from "@/components/icons/register-or-login-modal/FacebookIcon";
import { GoogleIcon } from "@/components/icons/register-or-login-modal/GoogleIcon";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { useRef } from "react";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

interface PanelProps {
  type: "register" | "login";
}

export const Panel: React.FC<PanelProps> = ({ type }) => {
  const registerRef = useRef<HTMLButtonElement>(null);
  const loginRef = useRef<HTMLButtonElement>(null);

  return (
    <Tab.Panel className="contents">
      <CloseButton />

      <header className="flex items-center justify-center p-4">
        <h2 className="font-bold md:text-xl">
          {type === "register" ? "Cadastrar" : "Entrar"}
        </h2>
      </header>

      <div className="my-auto flex flex-col items-center gap-6 rounded-full py-4 px-2">
        <Tab.List className="bg-inactive-background font-arial flex items-center rounded-full p-1">
          <Tab
            ref={registerRef}
            className={({ selected }) =>
              classNames("rounded-full py-1 px-5 font-bold", {
                "bg-primary text-white": selected,
              })
            }
          >
            Cadastrar
          </Tab>
          <Tab
            ref={loginRef}
            className={({ selected }) =>
              classNames("rounded-full py-1 px-5 font-bold", {
                "bg-primary text-white": selected,
              })
            }
          >
            Entrar
          </Tab>
        </Tab.List>

        <div className="flex w-full flex-col gap-1.5">
          <Button
            className="hover:bg-black/85 hover:border-black/85 border-black bg-black text-white"
            Icon={AppleIcon}
          >
            Continuar com a Apple
          </Button>

          <Button
            className="bg-white text-[#4d4d4d] hover:text-black"
            Icon={GoogleIcon}
          >
            Continuar com o Google
          </Button>

          <Button
            className="border-[#4267b2] bg-[#4267b2] text-white hover:border-[#34528e] hover:bg-[#34528e]"
            Icon={FacebookIcon}
          >
            Continuar com o Facebook
          </Button>
        </div>

        <Button
          className="bg-primary hover:bg-primary-hover border-primary text-white"
          iconPosition="right"
          Icon={ArrowRightIcon}
        >
          Continuar com o e-mail
        </Button>

        {type === "login" && (
          <p className="text-secondary-foreground text-sm">
            👋 Olá! É bom te ver de novo.
          </p>
        )}
      </div>

      <footer className="border-default-border mt-auto flex items-center justify-center border-t p-4">
        <p className="text-sm">
          {type === "register" ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
          <button
            className="font-bold underline"
            onClick={() => {
              const el =
                type === "register" ? loginRef.current! : registerRef.current!;

              el.click();
            }}
          >
            {type === "register" ? "Entrar" : "Cadastrar"}
          </button>
        </p>
      </footer>
    </Tab.Panel>
  );
};
