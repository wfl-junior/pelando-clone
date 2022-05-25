import { DEFAULT_PER_PAGE } from "@/src/constants";
import { Store } from "@/src/entities";
import { calculatePaginationOffset } from "@/src/utils/calculatePaginationOffset";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { FindManyOptions } from "typeorm";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { transformEntitiesDatesToString } from "./utils/transformDatesToString";

const defaultFindOptions: FindManyOptions<Store> = {
  select: {
    id: true,
    createdAt: true,
    updatedAt: false,
    slug: true,
    name: true,
    url: true,
    image: true,
  },
};

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
      ...defaultFindOptions,
      take: DEFAULT_PER_PAGE,
    });

    expect(response.body.data.stores.stores?.edges).toEqual(
      transformEntitiesDatesToString(stores),
    );
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
      ...defaultFindOptions,
      take: perPage,
    });

    expect(response.body.data.stores.stores?.edges).toEqual(
      transformEntitiesDatesToString(stores),
    );
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
      ...defaultFindOptions,
      take: perPage,
      skip: calculatePaginationOffset(page, perPage),
    });

    expect(response.body.data.stores.stores?.edges).toEqual(
      transformEntitiesDatesToString(stores),
    );
  });
});
