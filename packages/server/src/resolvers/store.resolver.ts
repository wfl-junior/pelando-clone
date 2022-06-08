import { Args, Query, Resolver } from "@nestjs/graphql";
import { IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Store } from "../entities";
import { PaginatedQueryInput } from "../graphql-types/Input/PaginatedQueryInput";
import { StoresQueryResponse } from "../graphql-types/Object/stores/StoresQueryResponse";
import { calculatePaginationOffset } from "../utils/calculatePaginationOffset";
import { getPageInfo } from "../utils/getPageInfo";

@Resolver(() => Store)
export class StoreResolver {
  @Query(() => StoresQueryResponse)
  async stores(
    @Args("input", { type: () => PaginatedQueryInput, nullable: true })
    input?: PaginatedQueryInput | null,
  ): Promise<IResolverResponse<StoresQueryResponse>> {
    const perPage = input?.perPage || DEFAULT_PER_PAGE;
    const page = input?.page || 1;
    const offset = calculatePaginationOffset(page, perPage);

    const [stores, count] = await Store.findAndCount({
      take: perPage,
      skip: offset,
    });

    return {
      ok: true,
      stores: {
        edges: stores,
        info: getPageInfo({ count, perPage, offset }),
      },
    };
  }
}
