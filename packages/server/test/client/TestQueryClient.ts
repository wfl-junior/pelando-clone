import { CommentsQueryInput } from "@/src/graphql-types/Input/comments/CommentsQueryInput";
import { PaginatedQueryInput } from "@/src/graphql-types/Input/PaginatedQueryInput";
import { ProductQueryInput } from "@/src/graphql-types/Input/products/ProductQueryInput";
import { ProductsQueryInput } from "@/src/graphql-types/Input/products/ProductsQueryInput";
import { CommentsQueryResponse } from "@/src/graphql-types/Object/comments/CommentsQueryResponse";
import { ProductQueryResponse } from "@/src/graphql-types/Object/products/ProductQueryResponse";
import { ProductsQueryResponse } from "@/src/graphql-types/Object/products/ProductsQueryResponse";
import { StoresQueryResponse } from "@/src/graphql-types/Object/stores/StoresQueryResponse";
import { MeResponse } from "@/src/graphql-types/Object/users/MeResponse";
import type { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { commentsQuery } from "../graphql/queries/commentsQuery";
import { meQuery } from "../graphql/queries/meQuery";
import { productQuery } from "../graphql/queries/productQuery";
import { productsQuery } from "../graphql/queries/productsQuery";
import { storesQuery } from "../graphql/queries/storesQuery";
import type { Response, ResponseWithErrors, Variables } from "./types";

export class TestQueryClient {
  constructor(private app: INestApplication) {}

  products(
    variables?: Variables<ProductsQueryInput>,
  ): Promise<Response<{ products: ProductsQueryResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(productsQuery),
        variables,
      });
  }

  comments(
    variables: Variables<CommentsQueryInput>,
  ): Promise<Response<{ comments: CommentsQueryResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(commentsQuery),
        variables,
      });
  }

  stores(
    variables?: Variables<PaginatedQueryInput>,
  ): Promise<Response<{ stores: StoresQueryResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(storesQuery),
        variables,
      });
  }

  me(
    accessToken: string | null = null,
  ): Promise<ResponseWithErrors<{ me: MeResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .set("authorization", `Bearer ${accessToken}`)
      .send({ query: print(meQuery) });
  }

  product(
    variables?: Variables<ProductQueryInput>,
  ): Promise<Response<{ product: ProductQueryResponse }>> {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(productQuery),
        variables,
      });
  }
}
