import { Args, Context, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { QueryFailedError } from "typeorm";
import { IContextWithUser, IResolverResponse } from "../@types/app";
import { DEFAULT_PER_PAGE } from "../constants";
import { Comment, Product } from "../entities";
import { AddCommentInput } from "../graphql-types/Input/comments/AddCommentInput";
import { CommentsQueryInput } from "../graphql-types/Input/comments/CommentsQueryInput";
import { EditCommentInput } from "../graphql-types/Input/comments/EditCommentInput";
import { CommentResponse } from "../graphql-types/Object/comments/CommentResponse";
import { CommentsQueryResponse } from "../graphql-types/Object/comments/CommentsQueryResponse";
import { ResolverResponse } from "../graphql-types/Object/ResolverResponse";
import { UseAuthGuard } from "../guards/auth.guard";
import { UseValidationInterceptor } from "../interceptors/validation.interceptor";
import { calculatePaginationOffset } from "../utils/calculatePaginationOffset";
import { getEntityNotFoundMessage } from "../utils/getEntityNotFoundMessage";
import { getPageInfo } from "../utils/getPageInfo";
import { removeNullPropertiesDeep } from "../utils/removeNullPropertiesDeep";
import { commentValidationSchema } from "../yup/commentValidationSchema";

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => CommentsQueryResponse)
  async comments(
    @Args("input", { type: () => CommentsQueryInput })
    input: CommentsQueryInput,
  ): Promise<IResolverResponse<CommentsQueryResponse>> {
    const perPage = input.perPage || DEFAULT_PER_PAGE;
    const page = input.page || 1;
    const offset = calculatePaginationOffset(page, perPage);

    const [comments, count] = await Comment.findAndCount({
      take: perPage,
      skip: offset,
      relations: ["user", "product", "product.store", "product.category"],
      where: input.where,
      order: input.orderBy
        ? removeNullPropertiesDeep(input.orderBy)
        : undefined,
    });

    return {
      ok: true,
      comments: {
        edges: comments,
        info: getPageInfo({ count, perPage, offset }),
      },
    };
  }

  @Mutation(() => CommentResponse)
  @UseAuthGuard()
  @UseValidationInterceptor(commentValidationSchema)
  async addComment(
    @Args("input", { type: () => AddCommentInput }) input: AddCommentInput,
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<CommentResponse>> {
    try {
      const comment = await Comment.create({
        ...input,
        userId: user.id,
      }).save();

      const query = Product.createQueryBuilder("product")
        .innerJoinAndSelect("product.store", "store")
        .innerJoinAndSelect("product.category", "category")
        .leftJoin(
          "user_product_vote",
          "vote",
          "vote.productId = product.id AND vote.userId = :userId",
          { userId: user.id },
        )
        .addSelect("vote.type", "userVoteType")
        .where({ id: comment.productId });

      // pegar raw porque o TypeORM não tem um jeito mais fácil de adicionar columns extras na entity
      const {
        entities: [product],
        raw: [rawProduct],
      } = await query.getRawAndEntities();

      product.userVoteType = rawProduct.userVoteType;
      Object.assign(comment, { user, product });

      return {
        ok: true,
        comment,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.toLowerCase().includes("foreign key")
      ) {
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

      // lança para o default error interceptor
      throw error;
    }
  }

  @Mutation(() => CommentResponse)
  @UseAuthGuard()
  @UseValidationInterceptor(commentValidationSchema)
  async editComment(
    @Args("input", { type: () => EditCommentInput }) input: EditCommentInput,
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse<CommentResponse>> {
    const comment = await Comment.findOne({
      where: { id: input.id },
      relations: ["user", "product", "product.store", "product.category"],
    });

    if (!comment) {
      return {
        ok: false,
        errors: [
          {
            path: "id",
            message: getEntityNotFoundMessage("Comment"),
          },
        ],
      };
    }

    if (comment.userId !== user.id) {
      return {
        ok: false,
        errors: [
          {
            path: "userId",
            message: "you must be the owner to edit the comment",
          },
        ],
      };
    }

    comment.body = input.body;
    await comment.save();

    return {
      ok: true,
      comment,
    };
  }

  @Mutation(() => ResolverResponse)
  @UseAuthGuard()
  async deleteComment(
    @Args("id", { type: () => ID }) id: string,
    @Context() { user }: IContextWithUser,
  ): Promise<IResolverResponse> {
    const comment = await Comment.findOne({
      where: { id },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!comment) {
      return {
        ok: false,
        errors: [
          {
            path: "id",
            message: getEntityNotFoundMessage("Comment"),
          },
        ],
      };
    }

    if (comment.userId !== user.id) {
      return {
        ok: false,
        errors: [
          {
            path: "userId",
            message: "you must be the owner to delete the comment",
          },
        ],
      };
    }

    await comment.remove({ transaction: false });
    return { ok: true };
  }
}
