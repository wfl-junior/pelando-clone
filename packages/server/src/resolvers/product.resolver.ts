import { Args, Query, Resolver } from "@nestjs/graphql";
import { Product } from "../entities";
import { ProductsQueryInput } from "../graphql-types/Input/products/ProductsQueryInput";
import { ProductsQueryResponse } from "../graphql-types/Object/products/ProductsQueryResponse";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsQueryResponse)
  async products(
    @Args("input", { type: () => ProductsQueryInput, nullable: true })
    input?: ProductsQueryInput | null,
  ): Promise<ProductsQueryResponse> {
    try {
      const perPage = input?.perPage || 20;
      const offset = input?.offset || 0;

      const [result, count] = await Product.findAndCount({
        take: perPage,
        skip: offset,
      });

      return {
        ok: true,
        products: {
          edges: result,
          info: {
            total: count,
            perPage,
            from: offset + 1,
            to: Math.min(offset + perPage, count),
            hasNextPage: perPage + offset < count,
            hasPreviousPage: offset > 0,
          },
        },
      };
    } catch (err) {
      console.log({ err });

      return defaultErrorResponse();
    }
  }
}
