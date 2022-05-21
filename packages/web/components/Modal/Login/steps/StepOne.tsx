import { Input } from "@/components/Input";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { Step } from ".";
import { LoginFields } from "../../Login";

export const StepOne: React.FC = () => {
  const { values } = useFormikContext<LoginFields>();
  const [field, setField] = useState<keyof LoginFields | null>(() => {
    if (values.email) {
      return "email";
    }

    if (values.username) {
      return "username";
    }

    return null;
  });

  if (!field) {
    const buttonClassName =
      "text-sm bg-default-background border border-default-border rounded-full w-max py-1 px-4 font-bold hover:text-tertiary-foreground transition-colors text-tertiary-foreground/60";

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          className={buttonClassName}
          onClick={() => setField("email")}
        >
          Desejo entrar com meu e-mail
        </button>

        <button
          type="button"
          className={buttonClassName}
          onClick={() => setField("username")}
        >
          Desejo entrar com meu nome de usuário
        </button>
      </div>
    );
  }

  return (
    <Step
      heading={`Qual é o seu ${
        field === "email" ? "e-mail" : "nome de usuário"
      }?`}
      field={field}
    >
      <Input
        type="text"
        name={field}
        placeholder={`ex.: ${
          field === "email" ? "pelando@clone.com" : "pelando-clone"
        }`}
        autoFocus
      />
    </Step>
  );
};
