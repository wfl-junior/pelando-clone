import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRight";
import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import React from "react";

export const BackButton: React.FC = () => {
  const { step, setStep } = useRegisterOrLoginContext();

  if (step === 0) {
    return null;
  }

  return (
    <button
      className="absolute top-1/2 left-4 -translate-y-1/2 transform"
      onClick={() => setStep(step => step - 1)}
    >
      <ArrowRightIcon className="w-6 rotate-180" />
    </button>
  );
};
