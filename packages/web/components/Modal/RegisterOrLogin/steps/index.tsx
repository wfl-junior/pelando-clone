import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRight";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { RegisterOrLoginFields } from "../Panel";

interface StepProps {
  heading: string;
  children: React.ReactNode;
  submitText?: string;
  field: keyof RegisterOrLoginFields;
}

export const Step: React.FC<StepProps> = ({
  heading,
  children,
  submitText,
  field,
}) => {
  const { errors, validateForm, isSubmitting } =
    useFormikContext<RegisterOrLoginFields>();

  useEffect(() => {
    validateForm();
  }, []);

  // isValid do Formik pode ter errors de outros steps
  const isInvalid = field in errors;

  return (
    <Form
      className="flex flex-col items-center gap-4 rounded-full p-4"
      noValidate
    >
      <h2 className="text-2xl font-bold">{heading}</h2>

      {children}

      <Button
        type="submit"
        className="flex items-center gap-4 self-end transition-none"
        disabled={isInvalid || isSubmitting}
      >
        <span>{submitText || "continuar"}</span>
        <ArrowRightIcon className="w-5" />
      </Button>
    </Form>
  );
};
