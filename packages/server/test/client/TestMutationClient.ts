import { AddCommentInput } from "@/src/graphql-types/Input/comments/AddCommentInput";
import { EditCommentInput } from "@/src/graphql-types/Input/comments/EditCommentInput";
import { RemoveVoteFromProductInput } from "@/src/graphql-types/Input/products/RemoveVoteFromProductInput";
import { VoteOnProductInput } from "@/src/graphql-types/Input/products/VoteOnProductInput";
import { LoginInput } from "@/src/graphql-types/Input/users/LoginInput";
import { RegisterInput } from "@/src/graphql-types/Input/users/RegisterInput";
import { ProductQueryResponse } from "@/src/graphql-types/Object/products/ProductQueryResponse";
import { ResolverResponse } from "@/src/graphql-types/Object/ResolverResponse";
import type { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { addCommentMutation } from "../graphql/mutations/addCommentMutation";
import { deleteCommentMutation } from "../graphql/mutations/deleteCommentMutation";
import { editCommentMutation } from "../graphql/mutations/editCommentMutation";
import { loginMutation } from "../graphql/mutations/loginMutation";
import { registerMutation } from "../graphql/mutations/registerMutation";
import { removeVoteFromProductMutation } from "../graphql/mutations/removeVoteFromProductMutation";
import { voteOnProductMutation } from "../graphql/mutations/voteOnProductMutation";
import type {
  ResponseWithErrors,
  TestAddCommentMutationResponse,
  TestEditCommentMutationResponse,
  TestLoginMutationResponse,
  TestRegisterMutationResponse,
  Variables,
} from "./types";

export class TestMutationClient {
  constructor(private app: INestApplication) {}

  register(
    variables: Variables<RegisterInput>,
  ): Promise<TestRegisterMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(registerMutation),
        variables,
      });
  }

  login(variables: Variables<LoginInput>): Promise<TestLoginMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(loginMutation),
        variables,
      });
  }

  voteOnProduct(
    variables: Variables<VoteOnProductInput>,
    accessToken: string | null = null,
  ): Promise<ResponseWithErrors<{ voteOnProduct: ProductQueryResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({
        query: print(voteOnProductMutation),
        variables,
      });
  }

  removeVoteFromProduct(
    variables: Variables<RemoveVoteFromProductInput>,
    accessToken: string | null = null,
  ): Promise<
    ResponseWithErrors<{ removeVoteFromProduct: ProductQueryResponse }>
  > {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({
        query: print(removeVoteFromProductMutation),
        variables,
      });
  }

  addComment(
    variables: Variables<AddCommentInput>,
    accessToken: string | null = null,
  ): Promise<TestAddCommentMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({
        query: print(addCommentMutation),
        variables,
      });
  }

  editComment(
    variables: Variables<EditCommentInput>,
    accessToken: string | null = null,
  ): Promise<TestEditCommentMutationResponse> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({
        query: print(editCommentMutation),
        variables,
      });
  }

  deleteComment(
    variables: { id: string },
    accessToken: string | null = null,
  ): Promise<ResponseWithErrors<{ deleteComment: ResolverResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({
        query: print(deleteCommentMutation),
        variables,
      });
  }
}
