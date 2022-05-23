import { ProductsQueryInput } from "@/@types/api";

export const getProductsVariablesForCategory = (
  category: string,
): ProductsQueryInput => ({
  where: { category: { slug: category } },
});
