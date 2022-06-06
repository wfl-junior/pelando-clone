import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { QueryFailedError } from "typeorm";
import { IContextWithUser, IResolverResponse } from "../@types/app";
import { Product } from "../entities";
import { UserProductVote } from "../entities/user-product-vote.entity";
import { UserProductVoteType } from "../graphql-types/enums/UserProductVoteType";
import { RemoveVoteFromProductInput } from "../graphql-types/Input/products/RemoveVoteFromProductInput";
import { VoteOnProductInput } from "../graphql-types/Input/products/VoteOnProductInput";
import { ProductQueryResponse } from "../graphql-types/Object/products/ProductQueryResponse";
import { AuthGuard } from "../guards/auth.guard";
import { defaultErrorResponse } from "../utils/defaultErrorResponse";
import { getEntityNotFoundMessage } from "../utils/getEntityNotFoundMessage";

@Resolver(() => Product)
export class ProductVoteResolver {
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
        relations: ["store", "category"],
      });

      if (!product) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: getEntityNotFoundMessage("Product"),
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
        relations: ["store", "category"],
      });

      if (!product) {
        return {
          ok: false,
          errors: [
            {
              path: "productId",
              message: getEntityNotFoundMessage("Product"),
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
