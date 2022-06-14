import { Toast } from "@/alerts/Toast";
import { GoogleIcon } from "@/components/icons/register-or-login-modal/GoogleIcon";
import { defaultErrorMessage } from "@/constants";
import { useModalContext } from "@/contexts/ModalContext";
import { useLoginWithGoogleMutation } from "@/hooks/apollo/mutations/useLoginWithGoogleMutation";
import { updateProductsVotesForUser } from "@/utils/updateProductsVotesForUser";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { AuthButton } from "./AuthButton";

interface GoogleButtonProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const _GoogleButton: React.FC<GoogleButtonProps> = ({ setLoading }) => {
  const [loginMutation] = useLoginWithGoogleMutation();
  const { toggleModal } = useModalContext();
  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async ({ token_type, access_token }) => {
      setLoading(true);
      const response = await loginMutation({
        context: {
          headers: {
            authorization: `${token_type} ${access_token}`,
          },
        },
      });

      if (response.data?.loginWithGoogle.errors) {
        return new Toast({
          message: response.data.loginWithGoogle.errors[0].message,
          type: "error",
        }).fire();
      }

      // sucesso
      new Toast({ message: "Você está logado", type: "success" }).fire();
      await updateProductsVotesForUser();
      toggleModal(false);
    },
    onError: response => {
      new Toast({
        message: response.error_description || defaultErrorMessage,
        type: "error",
      }).fire();
    },
  });

  return (
    <AuthButton
      className="bg-white text-[#4d4d4d] hover:text-black"
      Icon={GoogleIcon}
      onClick={() => login()}
    >
      Continuar com o Google
    </AuthButton>
  );
};

export const GoogleButton: React.FC<GoogleButtonProps> = props => (
  <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
    <_GoogleButton {...props} />
  </GoogleOAuthProvider>
);
