import { Args, Query, Resolver } from "@nestjs/graphql";
import { Product } from "../entities";
import { ProductsQueryInput } from "../graphql-types/Input/products/ProductsQueryInput";
import { ProductsQueryResponse } from "../graphql-types/Object/products/ProductsQueryResponse";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getPageInfo } from "../utils/getPageInfo";

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsQueryResponse)
  async products(
    @Args("input", { type: () => ProductsQueryInput, nullable: true })
    input?: ProductsQueryInput | null,
  ): Promise<ProductsQueryResponse> {
    try {
      const perPage = input?.perPage || 20;
      const page = input?.page || 1;
      const offset = perPage * page - perPage;

      const [result, count] = await Product.findAndCount({
        take: perPage,
        skip: offset,
      });

      return {
        ok: true,
        products: {
          edges: result,
          info: getPageInfo({ count, perPage, offset }),
        },
      };
    } catch (error) {
      console.log({ time: new Date(), where: "query products", error });
      return defaultErrorResponse();
    }
  }
}
