import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { In, QueryFailedError } from "typeorm";
import { IContext, IContextWithUser, IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Product } from "../entities";
import { UserProductVote } from "../entities/user-product-vote.entity";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { ProductsQueryInput } from "../graphql-types/Input/products/ProductsQueryInput";
import { RemoveVoteFromProductInput } from "../graphql-types/Input/products/RemoveVoteFromProductInput";
import { VoteOnProductInput } from "../graphql-types/Input/products/VoteOnProductInput";
import { ProductQueryResponse } from "../graphql-types/Object/products/ProductQueryResponse";
import { ProductsQueryResponse } from "../graphql-types/Object/products/ProductsQueryResponse";
import { AuthGuard } from "../guards/auth.guard";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
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
      const offset = perPage * page - perPage;

      const [products, count] = await Product.findAndCount({
        take: perPage,
        skip: offset,
        relations: ["store", "category"],
        where: input?.where ? removeNullPropertiesDeep(input.where) : undefined,
        order: input?.orderBy
          ? removeNullPropertiesDeep(input.orderBy)
          : undefined,
      });

      const user = await getUserFromRequest(request);

      if (user) {
        // TODO: talvez trocar este bloco por join na query principal
        const map = new Map<Product["id"], Product>();

        products.forEach(product => {
          map.set(product.id, product);
        });

        const votes = await UserProductVote.find({
          where: { productId: In([...map.keys()]) },
        });

        votes.forEach(vote => {
          const product = map.get(vote.productId);
          Object.assign(product, { userVoteType: vote.type });
        });
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

      await UserProductVote.insert({
        userId: user.id,
        productId,
        type,
      });

      // salva product somente se voto tiver sido inserido corretamente
      await product.save();

      product.userVoteType = type;

      return {
        ok: true,
        product,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes("UNIQUE")
      ) {
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

      await product.save();

      // remove voto somente se product tiver sido salvo
      await vote.remove();

      return {
        ok: true,
        product,
      };
    } catch (error) {
      console.log({
        time: new Date(),
        where: "mutation remove vote from product",
        error,
      });

      return defaultErrorResponse();
    }
  }
}
