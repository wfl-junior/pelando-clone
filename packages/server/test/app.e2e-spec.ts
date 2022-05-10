import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { print } from "graphql";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { helloQuery } from "./queries/helloQuery";

const graphqlEndpoint = "/graphql";

describe("GraphQL API test (e2e)", () => {
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

  it("hello query returns Hello World", () => {
    return request(app.getHttpServer())
      .post(graphqlEndpoint)
      .send({
        query: print(helloQuery),
      })
      .expect(200)
      .expect(response => {
        expect(response.body.data).toMatchObject({ hello: "Hello World" });
      });
  });
});
