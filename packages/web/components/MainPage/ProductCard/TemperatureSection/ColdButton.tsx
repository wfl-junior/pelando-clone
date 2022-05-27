import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { Spinner } from "@/components/Spinner";
import { useModalContext } from "@/contexts/ModalContext";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/mutations/useVoteOnProductMutation";
import { useUser } from "@/hooks/useUser";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";

export const ColdButton: React.FC = () => {
  const [vote, { loading }] = useVoteOnProductMutation();
  const { product } = useProductCardContext();
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
          await vote({
            variables: {
              input: {
                type: "COLD",
                productId: product.id,
              },
            },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
          });
        } catch (error) {
          // TODO: toast
          console.log({ error });
        }
      }}
    >
      {loading ? (
        <Spinner className="w-5 before:w-3/5" color="inactive-background" />
      ) : (
        <ColdIcon className="w-4.5" />
      )}
    </button>
  );
};
