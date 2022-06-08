import { Product, User } from "@/src/entities";
import { UserProductVoteType } from "@/src/graphql-types/enums/UserProductVoteType";
import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

const password = "national-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "removeVoteFromProduct-COLD@test.com",
  username: "remove-vote-from-product-COLD",
};

describe("removeVoteFromProduct mutation COLD type", () => {
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
      getRandomProduct(),
    ]);

    accessToken = createAccessToken(newUser);

    await client.mutation.voteOnProduct(
      {
        input: {
          productId: randomProduct.id,
          type: UserProductVoteType[UserProductVoteType.COLD] as any,
        },
      },
      accessToken,
    );
  });

  afterAll(async () => {
    // limpa user do banco de dados para evitar dúplicas nos testes
    await newUser.remove();
    await app.close();
  });

  it("logged in user can remove vote from product", async () => {
    const response = await client.mutation.removeVoteFromProduct(
      { input: { productId: randomProduct.id } },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.removeVoteFromProduct;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(product).not.toBeNull();
    expect(transformEntityDatesToString(randomProduct)).toEqual(product);
  });

  it("throws Unauthorized error if no access token is received", async () => {
    const response = await client.mutation.removeVoteFromProduct({
      input: { productId: randomProduct.id },
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

  it("product temperature changed with vote removal to what was before the vote", async () => {
    const product = await Product.findOneOrFail({
      where: { id: randomProduct.id },
      select: { temperature: true },
    });

    expect(product.temperature).toBe(randomProduct.temperature);
  });

  it("returns not found error if product doesn't exist", async () => {
    const response = await client.mutation.removeVoteFromProduct(
      { input: { productId: "hello-world" } },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.removeVoteFromProduct;

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

  it("returns error if user tries to remove nonexistent vote", async () => {
    const response = await client.mutation.removeVoteFromProduct(
      { input: { productId: randomProduct.id } },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, product } = response.body.data!.removeVoteFromProduct;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(product).toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "productId",
          message: "user doesn't have a vote for this product",
        },
      ]),
    );
  });
});
