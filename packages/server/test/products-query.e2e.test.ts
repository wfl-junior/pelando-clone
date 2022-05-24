import { Product } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { print } from "graphql";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { graphqlEndpoint } from "./constants";
import { productsQuery } from "./queries/productsQuery";

describe("products query", () => {
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
        query: print(productsQuery),
        variables: {
          input: {
            perPage,
            orderBy: {
              createdAt: "ASC",
            },
          },
        },
      })
      .expect(200)
      .expect(async response => {
        const products = await Product.find({
          select: ["id"],
          take: perPage,
          order: {
            createdAt: "ASC",
            // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
            id: "ASC",
          },
        });

        expect(response.body.data.products.products.edges).toEqual(products);
      });
  });

  it("works with pagination", () => {
    const page = 3;
    const perPage = 10;

    return request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(productsQuery),
        variables: {
          input: {
            page,
            perPage,
            orderBy: {
              createdAt: "ASC",
            },
          },
        },
      })
      .expect(200)
      .expect(async response => {
        const products = await Product.find({
          select: ["id"],
          take: perPage,
          skip: (page - 1) * perPage,
          order: {
            createdAt: "ASC",
            // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
            id: "ASC",
          },
        });

        expect(response.body.data.products.products.edges).toEqual(products);
      });
  });
});
