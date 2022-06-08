import { DEFAULT_PER_PAGE } from "@/src/constants";
import { Comment, Product } from "@/src/entities";
import { OrderByDirection } from "@/src/graphql-types/enums/OrderByDirection";
import { CommentsOrderByInput } from "@/src/graphql-types/Input/comments/CommentsOrderByInput";
import { calculatePaginationOffset } from "@/src/utils/calculatePaginationOffset";
import { removeNullPropertiesDeep } from "@/src/utils/removeNullPropertiesDeep";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { FindManyOptions } from "typeorm";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";
import { transformEntitiesDatesToString } from "./utils/transformDatesToString";

const defaultFindOptions: FindManyOptions<Comment> = {
  relations: ["user", "product", "product.store", "product.category"],
  select: {
    id: true,
    createdAt: true,
    updatedAt: false,
    body: true,
    user: {
      id: true,
      createdAt: true,
      updatedAt: false,
      username: true,
      email: true,
      image: true,
    },
    product: {
      id: true,
      createdAt: true,
      updatedAt: false,
      body: true,
      couponCode: true,
      price: true,
      sourceUrl: true,
      title: true,
      image: true,
      temperature: true,
      store: {
        id: true,
        createdAt: true,
        updatedAt: false,
        slug: true,
        name: true,
        url: true,
        image: true,
      },
      category: {
        id: true,
        createdAt: true,
        updatedAt: false,
        slug: true,
        title: true,
      },
    },
  },
};

describe("comments query", () => {
  let app: INestApplication;
  let client: TestClient;
  let randomProduct: Product;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);
    randomProduct = await getRandomProduct();
  });

  afterAll(async () => {
    await app.close();
  });

  it("works without variables", async () => {
    const response = await client.query.comments({
      input: {
        where: {
          productId: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const dbComments = await Comment.find({
      ...defaultFindOptions,
      take: DEFAULT_PER_PAGE,
      where: {
        productId: randomProduct.id,
      },
    });

    const { ok, errors, comments } = response.body.data.comments;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comments).not.toBeNull();
    expect(comments!.edges).toEqual(transformEntitiesDatesToString(dbComments));
  });

  it("works with perPage variable", async () => {
    const perPage = 10;

    const response = await client.query.comments({
      input: {
        perPage,
        where: {
          productId: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const dbComments = await Comment.find({
      ...defaultFindOptions,
      take: perPage,
    });

    const { ok, errors, comments } = response.body.data.comments;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comments).not.toBeNull();
    expect(comments!.edges).toEqual(transformEntitiesDatesToString(dbComments));
  });

  it("works with pagination variables", async () => {
    const page = 3;
    const perPage = 10;

    const response = await client.query.comments({
      input: {
        page,
        perPage,
        where: {
          productId: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const dbComments = await Comment.find({
      ...defaultFindOptions,
      take: perPage,
      skip: calculatePaginationOffset(page, perPage),
      where: {
        productId: randomProduct.id,
      },
    });

    const { ok, errors, comments } = response.body.data.comments;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comments).not.toBeNull();
    expect(comments!.edges).toEqual(transformEntitiesDatesToString(dbComments));
  });

  it("works with orderBy", async () => {
    const orderBy: CommentsOrderByInput = {
      createdAt: OrderByDirection.DESC,
    };

    const response = await client.query.comments({
      input: {
        orderBy,
        where: {
          productId: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const dbComments = await Comment.find({
      ...defaultFindOptions,
      take: DEFAULT_PER_PAGE,
      order: removeNullPropertiesDeep(orderBy),
    });

    const { ok, errors, comments } = response.body.data.comments;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comments).not.toBeNull();
    expect(comments!.edges).toEqual(transformEntitiesDatesToString(dbComments));
  });

  it("works with orderBy and pagination", async () => {
    const page = 4;
    const perPage = 5;
    const orderBy: CommentsOrderByInput = {
      body: OrderByDirection.ASC,
    };

    const response = await client.query.comments({
      input: {
        page,
        perPage,
        orderBy,
        where: {
          productId: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const dbComments = await Comment.find({
      ...defaultFindOptions,
      take: perPage,
      skip: calculatePaginationOffset(page, perPage),
      order: removeNullPropertiesDeep(orderBy),
    });

    const { ok, errors, comments } = response.body.data.comments;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comments).not.toBeNull();
    expect(comments!.edges).toEqual(transformEntitiesDatesToString(dbComments));
  });
});
