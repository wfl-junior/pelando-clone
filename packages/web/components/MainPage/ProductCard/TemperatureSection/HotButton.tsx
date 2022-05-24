import { HotIcon } from "@/components/icons/product-card/HotIcon";
import { useProductCardContext } from "@/contexts/ProductCardContext";
import { useVoteOnProductMutation } from "@/hooks/apollo/useVoteOnProductMutation";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import React from "react";

export const HotButton: React.FC = () => {
  const [vote] = useVoteOnProductMutation();
  const { product } = useProductCardContext();

  return (
    <button
      type="button"
      title="Esquentar"
      className="hover:bg-secondary-background hover:text-primary flex aspect-square w-6 items-center justify-center rounded-full transition-colors"
      onClick={async () => {
        try {
          await vote({
            variables: {
              input: {
                type: "HOT",
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
      <HotIcon className="w-5" />
    </button>
  );
};
