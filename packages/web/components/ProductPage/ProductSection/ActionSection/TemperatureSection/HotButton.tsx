import { HotIcon } from "@/components/icons/product-card/HotIcon";
import { Spinner } from "@/components/Spinner";
import { useModalContext } from "@/contexts/ModalContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/mutations/useVoteOnProductMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { useUser } from "@/hooks/useUser";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";

export const HotButton: React.FC = () => {
  const [vote, { loading }] = useVoteOnProductMutation();
  const { id } = useProductForProductPage();
  const { isLoggedIn } = useUser();
  const { toggleModal } = useModalContext();

  return (
    <button
      disabled={loading}
      type="button"
      title="Esquentar"
      className="hover:bg-secondary-background hover:text-primary flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      onClick={async () => {
        if (!isLoggedIn) {
          return toggleModal(true, "register-login");
        }

        try {
          await vote({
            variables: {
              input: {
                type: "HOT",
                productId: id,
              },
            },
            context: {
              headers: {
                authorization: authorizationHeaderWithToken(),
              },
            },
          });
        } catch (error) {
          // TODO: adicionar toast
          console.log({ error });
        }
      }}
    >
      {loading ? (
        <Spinner className="w-5 before:w-3/5" color="inactive-background" />
      ) : (
        <HotIcon className="w-5" />
      )}
    </button>
  );
};
