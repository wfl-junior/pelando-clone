import { Store } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";

describe("stores query", () => {
  let app: INestApplication;
  let client: TestClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it("works", async () => {
    const perPage = 10;

    const response = await client.query.stores({
      input: {
        perPage,
      },
    });

    expect(response.status).toBe(200);

    const stores = await Store.find({
      select: ["id"],
      take: perPage,
    });

    expect(response.body.data.stores.stores.edges).toEqual(stores);
  });

  it("works with pagination", async () => {
    const page = 2;
    const perPage = 10;

    const response = await client.query.stores({
      input: {
        page,
        perPage,
      },
    });

    expect(response.status).toBe(200);

    const stores = await Store.find({
      select: ["id"],
      take: perPage,
      skip: (page - 1) * perPage,
    });

    expect(response.body.data.stores.stores.edges).toEqual(stores);
  });
});
