import { ColdIcon } from "@/components/icons/product-card/ColdIcon";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/useVoteOnProductMutation";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";

export const ColdButton: React.FC = () => {
  const [vote] = useVoteOnProductMutation();
  const { product } = useProductCardContext();

  return (
    <button
      type="button"
      title="Esfriar"
      className="hover:bg-secondary-background hover:text-blue flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      onClick={async () => {
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
