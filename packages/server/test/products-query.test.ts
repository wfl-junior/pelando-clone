import { Product } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";

describe("products query", () => {
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

    const response = await client.query.products({
      input: {
        perPage,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: perPage,
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with pagination", async () => {
    const page = 3;
    const perPage = 10;

    const response = await client.query.products({
      input: {
        page,
        perPage,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: perPage,
      skip: (page - 1) * perPage,
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });
});
