import { useModalContext } from "@/contexts/ModalContext";
import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import { useRegisterMutation } from "@/hooks/apollo/useRegisterMutation";
import { registerValidationSchemas } from "@/yup/registerValidationSchema";
import { ApolloError } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { Formik, FormikErrors } from "formik";
import React, { Fragment } from "react";
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
  const [registerMutation] = useRegisterMutation();
  const { toggleModal } = useModalContext();

  const steps: Array<ReturnType<React.FC>> = [
    <StepZero type={type} />,
    <StepOne />,
    <StepTwo />,
    <StepThree type={type} />,
  ];

  const lastStep = steps.length - 1;
  const isLastStep = step === lastStep;

  return (
    <Tab.Panel className="contents">
      <PanelHeader type={type} />
      <div className="my-auto">
        {step > 0 ? (
          <Formik
            validateOnBlur
            validateOnChange
            initialValues={initialValues}
            validationSchema={registerValidationSchemas[step - 1]}
            onSubmit={async (values, { setErrors }) => {
              if (!isLastStep) {
                return setStep(step => step + 1);
              }

              try {
                const response = await registerMutation({
                  variables: { input: values },
                });

                if (response.data?.register.errors) {
                  const { errors } = response.data.register;

                  setErrors(
                    errors.reduce((formikErrors, { path, message }) => {
                      if (path) {
                        Object.assign(formikErrors, { [path]: message });
                      }

                      return formikErrors;
                    }, {} as FormikErrors<RegisterOrLoginFields>),
                  );

                  const valuesKeys = Object.keys(values);

                  for (let index = 0; index < valuesKeys.length; index++) {
                    const key = valuesKeys[index];

                    if (errors.some(error => error.path === key)) {
                      // vai para o step do primeiro input com erro
                      return setStep(index + 1);
                    }
                  }
                }

                // fecha modal se tiver sucesso
                toggleModal(false);
              } catch (error) {
                if (error instanceof ApolloError) {
                  setStep(lastStep);

                  // trocar por toast?
                  setErrors({ password: error.message });
                }
              }
            }}
          >
            {({ isSubmitting }) =>
              isLastStep && isSubmitting ? (
                <StepSubmitting />
              ) : (
                <Fragment>{steps[step]}</Fragment>
              )
            }
          </Formik>
        ) : (
          steps[step]
        )}
      </div>
      <PanelFooter type={type} />
    </Tab.Panel>
  );
};
