import { Comment, Product, User } from "@/src/entities";
import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@add-comment-mutation_validation.com",
  username: "testing-comment_mutation-validation",
};

const badProductId = "hello-world";
const badBody = "ba";
const goodBody = "some real interesting comment";

describe("addComment validation mutation", () => {
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
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([
      newUser.remove(),
      Comment.delete({ userId: newUser.id }),
    ]);
    await app.close();
  });

  describe("body", () => {
    it("must be at least 3 characters", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.addComment(
          {
            input: {
              productId: randomProduct.id,
              body: badBody,
            },
          },
          accessToken,
        ),
        client.mutation.addComment(
          {
            input: {
              productId: randomProduct.id,
              body: goodBody,
            },
          },
          accessToken,
        ),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "body",
          message: expect.stringContaining("must be at least 3 characters"),
        },
      ]);

      expect(badResponse.body.data).not.toBeNull();
      expect(goodResponse.body.data).not.toBeNull();
      expect(badResponse.body.data!.addComment.errors).toEqual(expectedError);
      expect(goodResponse.body.data!.addComment.errors).not.toEqual(
        expectedError,
      );
    });
  });

  describe("productId", () => {
    it("returns not found for nonexistent product", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.addComment(
          {
            input: {
              productId: badProductId,
              body: goodBody,
            },
          },
          accessToken,
        ),
        client.mutation.addComment(
          {
            input: {
              productId: randomProduct.id,
              body: goodBody,
            },
          },
          accessToken,
        ),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "productId",
          message: getEntityNotFoundMessage("product"),
        },
      ]);

      expect(badResponse.body.data).not.toBeNull();
      expect(goodResponse.body.data).not.toBeNull();
      expect(badResponse.body.data!.addComment.errors).toEqual(expectedError);
      expect(goodResponse.body.data!.addComment.errors).not.toEqual(
        expectedError,
      );
    });
  });
});
