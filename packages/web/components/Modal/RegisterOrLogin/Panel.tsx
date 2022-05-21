import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import { registerValidationSchemas } from "@/yup/registerValidationSchema";
import { Tab } from "@headlessui/react";
import { Formik } from "formik";
import React from "react";
import { PanelFooter } from "./PanelFooter";
import { PanelHeader } from "./PanelHeader";
import { StepOne } from "./steps/StepOne";
import { StepSubmitting } from "./steps/StepSubmitting";
import { StepThree } from "./steps/StepThree";
import { StepTwo } from "./steps/StepTwo";
import { StepZero } from "./steps/StepZero";

export interface PanelProps {
  type: "register" | "login";
}

export interface RegisterOrLoginFields {
  email: string;
  username: string;
  password: string;
}

const initialValues: RegisterOrLoginFields = {
  email: "",
  username: "",
  password: "",
};

export const Panel: React.FC<PanelProps> = ({ type }) => {
  const { step, setStep } = useRegisterOrLoginContext();

  const steps: Array<ReturnType<React.FC>> = [
    <StepZero type={type} />,
    <StepOne />,
    <StepTwo />,
    <StepThree type={type} />,
    <StepSubmitting />,
  ];

  const isLastStep = step === steps.length - 1;

  return (
    <Tab.Panel className="contents">
      <PanelHeader type={type} isLastStep={isLastStep} />
      <div className="my-auto">
        {step > 0 ? (
          <Formik
            validateOnBlur
            validateOnChange
            initialValues={initialValues}
            validationSchema={registerValidationSchemas[step - 1]}
            onSubmit={async () => {
              if (!isLastStep) {
                return setStep(step => step + 1);
              }

              // register or login mutation
            }}
          >
            {steps[step]}
          </Formik>
        ) : (
          steps[step]
        )}
      </div>
      <PanelFooter type={type} />
    </Tab.Panel>
  );
};
