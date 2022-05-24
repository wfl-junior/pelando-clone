import { Args, Query, Resolver } from "@nestjs/graphql";
import { IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Store } from "../entities";
import { PaginatedQueryInput } from "../graphql-types/Input/PaginatedQueryInput";
import { StoresQueryResponse } from "../graphql-types/Object/stores/StoresQueryResponse";
import { calculatePaginationOffset } from "../utils/calculatePaginationOffset";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getPageInfo } from "../utils/getPageInfo";

@Resolver(() => Store)
export class StoreResolver {
  @Query(() => StoresQueryResponse)
  async stores(
    @Args("input", { type: () => PaginatedQueryInput, nullable: true })
    input?: PaginatedQueryInput | null,
  ): Promise<IResolverResponse<StoresQueryResponse>> {
    try {
      const perPage = input?.perPage || DEFAULT_PER_PAGE;
      const page = input?.page || 1;
      const offset = calculatePaginationOffset(page, perPage);

      const [result, count] = await Store.findAndCount({
        take: perPage,
        skip: offset,
      });

      return {
        ok: true,
        stores: {
          edges: result,
          info: getPageInfo({ count, perPage, offset }),
        },
      };
    } catch (error) {
      console.log({ time: new Date(), where: "query stores", error });
      return defaultErrorResponse();
    }
  }
}
