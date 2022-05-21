import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons/register-or-login-modal/ArrowRight";
import { Form, useFormikContext } from "formik";
import React, { useEffect } from "react";

interface StepProps {
  heading: string;
  children: React.ReactNode;
  submitText?: string;
}

export const Step: React.FC<StepProps> = ({
  heading,
  children,
  submitText,
}) => {
  const { isValid, validateForm, isSubmitting } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <Form
      className="my-auto flex flex-col items-center gap-4 rounded-full p-4"
      noValidate
    >
      <h2 className="text-2xl font-bold">{heading}</h2>

      {children}

      <Button
        type="submit"
        className="flex items-center gap-4 self-end"
        disabled={!isValid || isSubmitting}
      >
        <span>{submitText || "continuar"}</span>
        <ArrowRightIcon className="w-5" />
      </Button>
    </Form>
  );
};
