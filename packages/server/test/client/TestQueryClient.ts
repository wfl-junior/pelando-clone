import { PaginatedQueryInput } from "@/src/graphql-types/Input/PaginatedQueryInput";
import { ProductsQueryInput } from "@/src/graphql-types/Input/products/ProductsQueryInput";
import { ProductsQueryResponse } from "@/src/graphql-types/Object/products/ProductsQueryResponse";
import { StoresQueryResponse } from "@/src/graphql-types/Object/stores/StoresQueryResponse";
import type { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { productsQuery } from "../queries/productsQuery";
import { storesQuery } from "../queries/storesQuery";
import type { Response, Variables } from "./types";

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
}