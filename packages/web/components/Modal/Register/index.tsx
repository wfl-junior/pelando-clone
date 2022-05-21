import { useModalContext } from "@/contexts/ModalContext";
import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import { useRegisterMutation } from "@/hooks/apollo/useRegisterMutation";
import { registerValidationSchemas } from "@/yup/registerValidationSchema";
import { ApolloError } from "@apollo/client";
import { Formik, FormikErrors } from "formik";
import React, { Fragment } from "react";
import { BackButton } from "../RegisterOrLogin/BackButton";
import { PanelFooter } from "../RegisterOrLogin/PanelFooter";
import { PanelHeader } from "../RegisterOrLogin/PanelHeader";
import { StepOne } from "./steps/StepOne";
import { StepSubmitting } from "./steps/StepSubmitting";
import { StepThree } from "./steps/StepThree";
import { StepTwo } from "./steps/StepTwo";

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

const type = "register";

export const Register: React.FC = () => {
  const { step, setStep } = useRegisterOrLoginContext();
  const [registerMutation] = useRegisterMutation();
  const { toggleModal } = useModalContext();

  const steps: Array<ReturnType<React.FC>> = [
    <StepOne />,
    <StepTwo />,
    <StepThree type={type} />,
  ];

  const lastStep = steps.length - 1;
  const isLastStep = step === lastStep;

  return (
    <div className="bg-default-background relative flex h-screen w-screen flex-col md:h-auto md:min-h-[512px] md:w-full md:max-w-[360px] md:rounded-lg">
      <PanelHeader type={type}>
        <BackButton type={type} />
      </PanelHeader>

      <div className="my-auto">
        <Formik
          validateOnBlur
          validateOnChange
          initialValues={initialValues}
          validationSchema={registerValidationSchemas[step]}
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
                    return setStep(index);
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
      </div>

      <PanelFooter type={type} />
    </div>
  );
};
