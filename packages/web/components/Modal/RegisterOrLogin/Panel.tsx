import { AppleIcon } from "@/components/icons/register-or-login-modal/AppleIcon";
import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRight";
import { FacebookIcon } from "@/components/icons/register-or-login-modal/FacebookIcon";
import { GoogleIcon } from "@/components/icons/register-or-login-modal/GoogleIcon";
import { useModalContext } from "@/contexts/ModalContext";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useRef } from "react";
import { AuthButton } from "./AuthButton";
import { PanelFooter } from "./PanelFooter";
import { PanelHeader } from "./PanelHeader";

export interface PanelProps {
  type: "register" | "login";
}

export const Panel: React.FC<PanelProps> = ({ type }) => {
  const registerTabButtonRef = useRef<HTMLButtonElement>(null);
  const loginTabButtonRef = useRef<HTMLButtonElement>(null);
  const { toggleModal } = useModalContext();

  return (
    <Tab.Panel className="contents">
      <PanelHeader type={type} />

      <div className="my-auto flex flex-col items-center gap-6 rounded-full py-4 px-2">
        <Tab.List className="bg-inactive-background font-arial flex items-center rounded-full p-1">
          {() => {
            function className({ selected }: { selected: boolean }): string {
              return classNames("rounded-full py-1 px-5 font-bold", {
                "bg-primary text-white": selected,
              });
            }

            return (
              <Fragment>
                <Tab ref={registerTabButtonRef} className={className}>
                  Cadastrar
                </Tab>

                <Tab ref={loginTabButtonRef} className={className}>
                  Entrar
                </Tab>
              </Fragment>
            );
          }}
        </Tab.List>

        <div className="flex w-full flex-col gap-1.5">
          <AuthButton
            className="hover:bg-black/85 hover:border-black/85 border-black bg-black text-white"
            Icon={AppleIcon}
          >
            Continuar com a Apple
          </AuthButton>

          <AuthButton
            className="bg-white text-[#4d4d4d] hover:text-black"
            Icon={GoogleIcon}
          >
            Continuar com o Google
          </AuthButton>

          <AuthButton
            className="border-[#4267b2] bg-[#4267b2] text-white hover:border-[#34528e] hover:bg-[#34528e]"
            Icon={FacebookIcon}
          >
            Continuar com o Facebook
          </AuthButton>
        </div>

        <AuthButton
          className="bg-primary hover:bg-primary-hover border-primary hover:border-primary-hover text-white"
          iconPosition="right"
          Icon={ArrowRightIcon}
          onClick={() => toggleModal(true, type)}
        >
          Continuar com o e-mail
        </AuthButton>

        {type === "login" && (
          <p className="text-secondary-foreground text-sm">
            👋 Olá! É bom te ver de novo.
          </p>
        )}
      </div>

      <PanelFooter
        type={type}
        onClick={() => {
          const el =
            type === "register"
              ? loginTabButtonRef.current!
              : registerTabButtonRef.current!;

          el.click();
        }}
      />
    </Tab.Panel>
  );
};
