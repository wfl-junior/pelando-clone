import { Product, User } from "@/src/entities";
import { UserProductVote } from "@/src/entities/user-product-vote.entity";
import { UserProductVoteType } from "@/src/graphql-types/enums/UserProductVoteType";
import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

const password = "national-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "voteOnProduct-HOT@test.com",
  username: "vote-on-product-HOT",
};

const type = UserProductVoteType[UserProductVoteType.HOT] as any;

describe("voteOnProduct mutation HOT type", () => {
  let app: INestApplication;
  let client: TestClient;
  let newUser: User;
  let randomProduct: Product;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);

    [newUser, randomProduct] = await Promise.all([
      User.create({
        ...userInput,
        password,
      }).save(),
      Product.createQueryBuilder("product")
        .innerJoinAndSelect("product.store", "store")
        .innerJoinAndSelect("product.category", "category")
        .select([
          "product.id",
          "product.createdAt",
          "product.body",
          "product.couponCode",
          "product.price",
          "product.sourceUrl",
          "product.title",
          "product.image",
          "product.temperature",
          "store.id",
          "store.createdAt",
          "store.slug",
          "store.name",
          "store.url",
          "store.image",
          "category.id",
          "category.createdAt",
          "category.slug",
          "category.title",
        ])
        .orderBy("RANDOM()", Math.random() > 0.5 ? "ASC" : "DESC")
        .getOneOrFail(),
    ]);

    accessToken = createAccessToken(newUser);
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([
      newUser.remove(),
      UserProductVote.delete({ userId: newUser.id }),
    ]);
    await app.close();
  });

  it("logged in user can vote on product", async () => {
    const response = await client.mutation.voteOnProduct(
      {
        input: {
          productId: randomProduct.id,
          type,
        },
      },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.voteOnProduct;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(product).not.toBeNull();
    expect(product!.temperature).toBe(
      randomProduct.temperature + newUser.productVoteValue,
    );
    product!.temperature = randomProduct.temperature;
    expect(transformEntityDatesToString(randomProduct)).toEqual(product);
  });

  it("throws Unauthorized error if no access token is received", async () => {
    const response = await client.mutation.voteOnProduct({
      input: {
        productId: randomProduct.id,
        type,
      },
    });

    expect(response.status).toBe(200);

    const { data, errors } = response.body;

    expect(data).toBeNull();
    expect(errors).not.toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: new UnauthorizedException().message,
        }),
      ]),
    );
  });

  it("product temperature changed with vote to be temperature + user's productVoteValue", async () => {
    const product = await Product.findOneOrFail({
      where: { id: randomProduct.id },
      select: { temperature: true },
    });

    expect(product.temperature).toBe(
      randomProduct.temperature + newUser.productVoteValue,
    );
  });

  it("returns not found error if product doesn't exist", async () => {
    const response = await client.mutation.voteOnProduct(
      {
        input: {
          productId: "hello-world",
          type,
        },
      },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.voteOnProduct;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(product).toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "productId",
          message: getEntityNotFoundMessage("Product"),
        },
      ]),
    );
  });

  it("returns error if user tries to vote again on the same product", async () => {
    const response = await client.mutation.voteOnProduct(
      {
        input: {
          productId: randomProduct.id,
          type,
        },
      },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.voteOnProduct;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(product).toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "productId",
          message: "user already voted on this product",
        },
      ]),
    );
  });
});
