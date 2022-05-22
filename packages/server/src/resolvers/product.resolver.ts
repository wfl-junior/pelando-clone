import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IContextWithUser, IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Product } from "../entities";
import { UserProductVote } from "../entities/user-product-vote.entity";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { ProductsQueryInput } from "../graphql-types/Input/ProductsQueryInput";
import { RemoveVoteFromProductInput } from "../graphql-types/Input/RemoveVoteFromProductInput";
import { VoteOnProductInput } from "../graphql-types/Input/VoteOnProductInput";
import { ProductQueryResponse } from "../graphql-types/Object/products/ProductQueryResponse";
import { ProductsQueryResponse } from "../graphql-types/Object/products/ProductsQueryResponse";
import { AuthGuard } from "../guards/auth.guard";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getPageInfo } from "../utils/getPageInfo";

@Resolver(() => Product)
export class ProductResolver {
  @Query(() => ProductsQueryResponse)
  async products(
    @Args("input", { type: () => ProductsQueryInput, nullable: true })
    input?: ProductsQueryInput | null,
  ): Promise<IResolverResponse<ProductsQueryResponse>> {
    try {
      const perPage = input?.perPage || DEFAULT_PER_PAGE;
      const page = input?.page || 1;
      const offset = perPage * page - perPage;

      const [result, count] = await Product.findAndCount({
        take: perPage,
        skip: offset,
        relations: ["store", "category"],
        where: input?.where as any, //! ts não gosta do null, mas TypeORM converte null para undefined
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

  @Mutation(() => ProductQueryResponse)
  @UseGuards(new AuthGuard())
  async voteOnProduct(
    @Args("input", { type: () => VoteOnProductInput })
    { productId, type }: VoteOnProductInput,
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<ProductQueryResponse>> {
    // TODO: adicionar transactions aqui
    try {
      const product = await Product.findOne({
        where: { id: productId },
        relations: ["store"],
      });

      if (!product) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: "product doesn't exist",
            },
          ],
        };
      }

      const vote = await UserProductVote.findOne({
        where: {
          userId: user.id,
          productId,
        },
      });

      if (vote) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: "user already voted on this product",
            },
          ],
        };
      }

      switch (type) {
        case UserProductVoteType.HOT: {
          product.temperature += user.productVoteValue;
          break;
        }
        case UserProductVoteType.COLD: {
          product.temperature -= user.productVoteValue;
          break;
        }
      }

      await Promise.all([
        product.save(),
        UserProductVote.insert({
          userId: user.id,
          productId,
          type,
        }),
      ]);

      return {
        ok: true,
        product,
      };
    } catch (error) {
      console.log({
        time: new Date(),
        where: "mutation vote on product",
        error,
      });
      return defaultErrorResponse();
    }
  }

  @Mutation(() => ProductQueryResponse)
  @UseGuards(new AuthGuard())
  async removeVoteFromProduct(
    @Args("input", { type: () => RemoveVoteFromProductInput })
    { productId }: RemoveVoteFromProductInput,
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<ProductQueryResponse>> {
    // TODO: adicionar transactions aqui
    try {
      const product = await Product.findOne({
        where: { id: productId },
        relations: ["store"],
      });

      if (!product) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: "product doesn't exist",
            },
          ],
        };
      }

      const vote = await UserProductVote.findOne({
        where: {
          userId: user.id,
          productId,
        },
      });

      if (!vote) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: "user doesn't have a vote for this product",
            },
          ],
        };
      }

      switch (vote.type) {
        // voltar temperatura para como era antes do voto
        case UserProductVoteType.HOT: {
          product.temperature -= user.productVoteValue;
          break;
        }
        case UserProductVoteType.COLD: {
          product.temperature += user.productVoteValue;
          break;
        }
      }

      await Promise.all([product.save(), vote.remove()]);

      return {
        ok: true,
        product,
      };
    } catch (error) {
      console.log({
        time: new Date(),
        where: "mutation vote on product",
        error,
      });
      return defaultErrorResponse();
    }
  }
}
