import { DEFAULT_PER_PAGE } from "@/src/constants";
import { Product } from "@/src/entities";
import { OrderByDirection } from "@/src/graphql-types/enums/OrderByDirection";
import { ProductOrderByInput } from "@/src/graphql-types/Input/products/ProductOrderByInput";
import { ProductWhereInput } from "@/src/graphql-types/Input/products/ProductWhereInput";
import { calculatePaginationOffset } from "@/src/utils/calculatePaginationOffset";
import { removeNullPropertiesDeep } from "@/src/utils/removeNullPropertiesDeep";
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

  it("works without variables", async () => {
    const response = await client.query.products();

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: DEFAULT_PER_PAGE,
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with perPage variable", async () => {
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

  it("works with pagination variables", async () => {
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
      skip: calculatePaginationOffset(page, perPage),
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with where category slug", async () => {
    const where: ProductWhereInput = {
      category: {
        slug: "games-e-pc-gamer",
      },
    };

    const response = await client.query.products({
      input: {
        where,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: DEFAULT_PER_PAGE,
      where: removeNullPropertiesDeep(where),
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    products.forEach(product => {
      // @ts-expect-error
      delete product.createdAt;
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with where category slug and pagination", async () => {
    const page = 2;
    const perPage = 10;
    const where: ProductWhereInput = {
      category: {
        slug: "eletronicos",
      },
    };

    const response = await client.query.products({
      input: {
        page,
        perPage,
        where,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: perPage,
      skip: calculatePaginationOffset(page, perPage),
      where: removeNullPropertiesDeep(where),
      order: {
        // order by padrão
        createdAt: "ASC",
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with orderBy", async () => {
    const orderBy: ProductOrderByInput = {
      price: OrderByDirection.DESC,
    };

    const response = await client.query.products({
      input: {
        orderBy,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: DEFAULT_PER_PAGE,
      order: {
        ...removeNullPropertiesDeep(orderBy),
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });

  it("works with orderBy and pagination", async () => {
    const page = 4;
    const perPage = 5;
    const orderBy: ProductOrderByInput = {
      temperature: OrderByDirection.DESC,
    };

    const response = await client.query.products({
      input: {
        page,
        perPage,
        orderBy,
      },
    });

    expect(response.status).toBe(200);

    const products = await Product.find({
      select: ["id"],
      take: perPage,
      skip: calculatePaginationOffset(page, perPage),
      order: {
        ...removeNullPropertiesDeep(orderBy),
        // porque TypeORM faz uma distinct query adicionando order by id ASC, por causa de relations
        id: "ASC",
      },
    });

    expect(response.body.data.products.products?.edges).toEqual(products);
  });
});
