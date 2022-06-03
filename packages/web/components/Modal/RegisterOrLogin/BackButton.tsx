import { ArrowLeftIcon } from "@/components/icons/header/top/ArrowLeftIcon";
import { useModalContext } from "@/contexts/ModalContext";
import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import React from "react";
import { PanelProps } from "./Panel";

export const BackButton: React.FC<PanelProps> = ({ type }) => {
  const { step, setStep } = useRegisterOrLoginContext();
  const { toggleModal } = useModalContext();

  return (
    <button
      className="absolute top-1/2 left-4 -translate-y-1/2 transform"
      onClick={() => {
        if (step === 0) {
          toggleModal(true, "register-login", {
            initialTab: type === "login" ? 1 : 0,
          });
        } else {
          setStep(step => step - 1);
        }
      }}
    >
      <ArrowLeftIcon className="w-6" />
    </button>
  );
};
