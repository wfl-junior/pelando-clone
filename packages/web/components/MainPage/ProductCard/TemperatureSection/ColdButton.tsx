import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { useModalContext } from "@/contexts/ModalContext";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/useVoteOnProductMutation";
import { useUser } from "@/hooks/useUser";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";

export const ColdButton: React.FC = () => {
  const [vote] = useVoteOnProductMutation();
  const { product } = useProductCardContext();
  const { isLoggedIn } = useUser();
  const { toggleModal } = useModalContext();

  return (
    <button
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
      <ColdIcon className="w-4.5" />
    </button>
  );
};
