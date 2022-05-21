import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import { registerValidationSchemas } from "@/yup/registerValidationSchema";
import { Tab } from "@headlessui/react";
import { Formik } from "formik";
import React from "react";
import { PanelFooter } from "./PanelFooter";
import { PanelHeader } from "./PanelHeader";
import { StepOne } from "./steps/StepOne";
import { StepThree } from "./steps/StepThree";
import { StepTwo } from "./steps/StepTwo";
import { StepZero } from "./steps/StepZero";

export interface PanelProps {
  type: "register" | "login";
}

export const Panel: React.FC<PanelProps> = ({ type }) => {
  const { step, setStep } = useRegisterOrLoginContext();

  const steps: Array<ReturnType<React.FC>> = [
    <StepZero type={type} />,
    <StepOne type={type} />,
    <StepTwo type={type} />,
    <StepThree type={type} />,
  ];

  return (
    <Tab.Panel className="contents">
      <PanelHeader type={type} />
      {step > 0 ? (
        <Formik
          validateOnBlur
          validateOnChange
          initialValues={{ email: "", username: "", password: "" }}
          validationSchema={registerValidationSchemas[step - 1]}
          onSubmit={async () => {
            const lastStep = steps.length - 1;

            if (step !== lastStep) {
              return setStep(step => step + 1);
            }

            // register mutation
            console.log("register mutation");
          }}
        >
          {steps[step]}
        </Formik>
      ) : (
        steps[step]
      )}
      <PanelFooter type={type} />
    </Tab.Panel>
  );
};
