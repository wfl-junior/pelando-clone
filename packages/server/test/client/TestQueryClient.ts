import { PaginatedQueryInput } from "@/src/graphql-types/Input/PaginatedQueryInput";
import { ProductsQueryInput } from "@/src/graphql-types/Input/products/ProductsQueryInput";
import { INestApplication } from "@nestjs/common";
import { print } from "graphql";
import supertest from "supertest";
import { graphqlEndpoint } from "../constants";
import { productsQuery } from "../queries/productsQuery";
import { storesQuery } from "../queries/storesQuery";

interface Variables<T> {
  input: T;
}

export class TestQueryClient {
  constructor(private app: INestApplication) {}

  products(variables?: Variables<ProductsQueryInput>) {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(productsQuery),
        variables,
      });
  }

  stores(variables?: Variables<PaginatedQueryInput>) {
    return supertest(this.app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(storesQuery),
        variables,
      });
  }
}
