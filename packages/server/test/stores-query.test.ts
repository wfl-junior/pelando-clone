import { Store } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { print } from "graphql";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { graphqlEndpoint } from "./constants";
import { storesQuery } from "./queries/storesQuery";

describe("stores query", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("works", () => {
    const perPage = 10;

    return request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(storesQuery),
        variables: {
          input: {
            perPage,
          },
        },
      })
      .expect(200)
      .expect(async response => {
        const stores = await Store.find({
          select: ["id"],
          take: perPage,
        });

        expect(response.body.data.stores.stores.edges).toEqual(stores);
      });
  });

  it("works with pagination", () => {
    const page = 2;
    const perPage = 10;

    return request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(storesQuery),
        variables: {
          input: {
            page,
            perPage,
          },
        },
      })
      .expect(200)
      .expect(async response => {
        const stores = await Store.find({
          select: ["id"],
          take: perPage,
          skip: (page - 1) * perPage,
        });

        expect(response.body.data.stores.stores.edges).toEqual(stores);
      });
  });
});
