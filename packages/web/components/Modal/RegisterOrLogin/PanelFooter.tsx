import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import React from "react";
import { PanelProps } from "./Panel";

export const PanelFooter: React.FC<PanelProps> = ({ type }) => {
  const { loginTabButtonRef, registerTabButtonRef, step, setStep } =
    useRegisterOrLoginContext();

  return (
    <div className="border-default-border mt-auto flex items-center justify-center border-t p-4">
      <p className="text-sm">
        {type === "register" ? "Já tem uma conta?" : "Não tem uma conta?"}
        &nbsp;
        <button
          className="font-bold underline"
          onClick={() => {
            if (step > 0) {
              // fazendo deste jeito porque as tabs de headlessui não vão estar renderizadas fora de step 1 e as refs não existem ainda
              setStep(0, () => {
                // requestAnimationFrame para evitar bugs de click nos tab buttons não indo
                requestAnimationFrame(() => {
                  const el =
                    type === "register"
                      ? loginTabButtonRef.current!
                      : registerTabButtonRef.current!;

                  el.click();
                });
              });
            } else {
              const el =
                type === "register"
                  ? loginTabButtonRef.current!
                  : registerTabButtonRef.current!;

              el.click();
            }
          }}
        >
          {type === "register" ? "Entrar" : "Cadastrar"}
        </button>
      </p>
    </div>
  );
};
