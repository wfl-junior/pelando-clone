import { Toast } from "@/alerts/Toast";
import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { Spinner } from "@/components/Spinner";
import { defaultErrorMessage } from "@/constants";
import { useModalContext } from "@/contexts/ModalContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/mutations/useVoteOnProductMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { useUser } from "@/hooks/useUser";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { ApolloError } from "@apollo/client";
import React from "react";

export const ColdButton: React.FC = () => {
  const [vote, { loading }] = useVoteOnProductMutation();
  const { id } = useProductForProductPage();
  const { isLoggedIn } = useUser();
  const { toggleModal } = useModalContext();

  return (
    <button
      disabled={loading}
      type="button"
      title="Esfriar"
      className="hover:bg-secondary-background hover:text-blue flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      onClick={async () => {
        if (!isLoggedIn) {
          return toggleModal(true, "register-login");
        }

        try {
          const { data } = await vote({
            variables: {
              input: {
                type: "COLD",
                productId: id,
              },
            },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
          });

          if (data?.voteOnProduct.errors) {
            new Toast({
              message: data.voteOnProduct.errors[0].message,
              type: "error",
            }).fire();
          }
        } catch (error) {
          // se for ApolloError, o onError global resolve
          if (!(error instanceof ApolloError)) {
            new Toast({ message: defaultErrorMessage, type: "error" }).fire();
          }
        }
      }}
    >
      {loading ? (
        <Spinner className="w-4.5 before:w-3/5" color="inactive-background" />
      ) : (
        <ColdIcon className="w-4.5" />
      )}
    </button>
  );
};
