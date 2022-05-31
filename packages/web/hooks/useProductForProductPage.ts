import { getVariables } from "@/pages/o/[id]";
import { useRouter } from "next/router";
import { useProductQuery } from "./apollo/queries/useProductQuery";

export function useProductForProductPage() {
  const { query } = useRouter();
  const { data } = useProductQuery({
    variables: getVariables(query.id as string),
  });

  return data!.product.product;
}
