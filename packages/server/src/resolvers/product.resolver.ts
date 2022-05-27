import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { JsonWebTokenError } from "jsonwebtoken";
import { FindOptionsWhere, In } from "typeorm";
import { IContext, IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Product } from "../entities";
import { UserProductVote } from "../entities/user-product-vote.entity";
import { ProductQueryInput } from "../graphql-types/Input/products/ProductQueryInput";
import { ProductsQueryInput } from "../graphql-types/Input/products/ProductsQueryInput";
import { ProductQueryResponse } from "../graphql-types/Object/products/ProductQueryResponse";
import { ProductsQueryResponse } from "../graphql-types/Object/products/ProductsQueryResponse";
import { calculatePaginationOffset } from "../utils/calculatePaginationOffset";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getEntityNotFoundMessage } from "../utils/getEntityNotFoundMessage";
import { getPageInfo } from "../utils/getPageInfo";
import { getUserFromRequest } from "../utils/getUserFromRequest";
import { removeNullPropertiesDeep } from "../utils/removeNullPropertiesDeep";

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsQueryResponse)
  async products(
    @Context() { request }: IContext,
    @Args("input", { type: () => ProductsQueryInput, nullable: true })
    input?: ProductsQueryInput | null,
  ): Promise<IResolverResponse<ProductsQueryResponse>> {
    try {
      const perPage = input?.perPage || DEFAULT_PER_PAGE;
      const page = input?.page || 1;
      const offset = calculatePaginationOffset(page, perPage);

      const where: FindOptionsWhere<Product> = {};

      if (input?.where) {
        const { ids } = input.where;
        const parsedInputWhere = removeNullPropertiesDeep(input.where);
        delete parsedInputWhere.ids;
        Object.assign(where, parsedInputWhere);

        if (ids) {
          Object.assign(where, { id: In(ids) });
        }
      }

      const [products, count] = await Product.findAndCount({
        take: perPage,
        skip: offset,
        relations: ["store", "category"],
        where,
        order: input?.orderBy
          ? removeNullPropertiesDeep(input.orderBy)
          : undefined,
      });

      try {
        const user = await getUserFromRequest(request);

        if (user) {
          // TODO: talvez trocar este bloco por join na query de products
          const map = new Map<Product["id"], Product>();

          products.forEach(product => {
            map.set(product.id, product);
          });

          const votes = await UserProductVote.find({
            where: {
              userId: user.id,
              productId: In([...map.keys()]),
            },
          });

          votes.forEach(vote => {
            const product = map.get(vote.productId);
            Object.assign(product, { userVoteType: vote.type });
          });
        }
      } catch (error) {
        // ignorar se for erro de jwt
        if (!(error instanceof JsonWebTokenError)) {
          throw error;
        }
      }

      return {
        ok: true,
        products: {
          edges: products,
          info: getPageInfo({ count, perPage, offset }),
        },
      };
    } catch (error) {
      console.log({ time: new Date(), where: "query products", error });
      return defaultErrorResponse();
    }
  }

  @Query(() => ProductQueryResponse)
  async product(
    @Context() { request }: IContext,
    @Args("input", { type: () => ProductQueryInput })
    input: ProductQueryInput,
  ): Promise<IResolverResponse<ProductQueryResponse>> {
    try {
      const query = Product.createQueryBuilder("product")
        .innerJoinAndSelect("product.store", "store")
        .innerJoinAndSelect("product.category", "category")
        .where(input.where);

      try {
        const user = await getUserFromRequest(request);

        if (user) {
          query
            .leftJoin(
              "user_product_vote",
              "vote",
              "vote.productId = product.id AND vote.userId = :userId",
              { userId: user.id },
            )
            .addSelect("vote.type", "userVoteType");
        }
      } catch (error) {
        // ignorar se for erro de jwt
        if (!(error instanceof JsonWebTokenError)) {
          throw error;
        }
      }

      const {
        entities: [product],
        raw: [raw],
      } = await query.getRawAndEntities();

      if (!product) {
        return {
          ok: false,
          errors: [
            {
              path: "id",
              message: getEntityNotFoundMessage("Product"),
            },
          ],
        };
      }

      product.userVoteType = raw.userVoteType;

      return {
        ok: true,
        product,
      };
    } catch (error) {
      console.log({ time: new Date(), where: "query product", error });
      return defaultErrorResponse();
    }
  }
}
