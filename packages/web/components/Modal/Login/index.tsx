import { useModalContext } from "@/contexts/ModalContext";
import { useRegisterOrLoginContext } from "@/contexts/RegisterOrLoginContext";
import { useLoginMutation } from "@/hooks/apollo/mutations/useLoginMutation";
import { updateProductsVotesForUser } from "@/utils/updateProductsVotesForUser";
import { loginValidationSchemas } from "@/yup/loginValidationSchema";
import { ApolloError } from "@apollo/client";
import { Formik, FormikErrors } from "formik";
import React, { Fragment } from "react";
import { BackButton } from "../RegisterOrLogin/BackButton";
import { PanelFooter } from "../RegisterOrLogin/Panel/PanelFooter";
import { PanelHeader } from "../RegisterOrLogin/Panel/PanelHeader";
import { StepOne } from "./steps/StepOne";
import { StepSubmitting } from "./steps/StepSubmitting";
import { StepTwo } from "./steps/StepTwo";

export interface LoginFields {
  email: string;
  username: string;
  password: string;
}

const initialValues: LoginFields = {
  email: "",
  username: "",
  password: "",
};

const type = "login";

export const Login: React.FC = () => {
  const { step, setStep } = useRegisterOrLoginContext();
  const { toggleModal } = useModalContext();
  const [login] = useLoginMutation();

  const steps: Array<ReturnType<React.FC>> = [<StepOne />, <StepTwo />];

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
          validationSchema={loginValidationSchemas[step]}
          onSubmit={async (values, { setErrors }) => {
            if (!isLastStep) {
              return setStep(step => step + 1);
            }

            try {
              const response = await login({
                variables: {
                  // enviar email sem username se tiver email, ou se tiver username enviar username sem email
                  input: values.email
                    ? {
                        ...values,
                        username: undefined,
                      }
                    : {
                        ...values,
                        email: undefined,
                      },
                },
              });

              if (response.data?.login.errors) {
                const { errors } = response.data.login;

                setErrors(
                  errors.reduce((formikErrors, { path, message }) => {
                    if (path) {
                      Object.assign(formikErrors, { [path]: message });
                    }

                    return formikErrors;
                  }, {} as FormikErrors<LoginFields>),
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

              // sucesso
              await updateProductsVotesForUser();
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
