import { DEFAULT_PER_PAGE } from "@/src/constants";
import { Store } from "@/src/entities";
import { calculatePaginationOffset } from "@/src/utils/calculatePaginationOffset";
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

  it("works without variables", async () => {
    const response = await client.query.stores();

    expect(response.status).toBe(200);

    const stores = await Store.find({
      select: ["id"],
      take: DEFAULT_PER_PAGE,
    });

    expect(response.body.data.stores.stores?.edges).toEqual(stores);
  });

  it("works with perPage variable", async () => {
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

    expect(response.body.data.stores.stores?.edges).toEqual(stores);
  });

  it("works with pagination variables", async () => {
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
      skip: calculatePaginationOffset(page, perPage),
    });

    expect(response.body.data.stores.stores?.edges).toEqual(stores);
  });
});
