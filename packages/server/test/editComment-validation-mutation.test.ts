import { Comment, Product, User } from "@/src/entities";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@edit-comment-mutation_validation.com",
  username: "testing-edit-comment_mutation-validation",
};

const badBody = "ba";
const goodBody = "some real interesting comment";

describe("editComment validation mutation", () => {
  let app: INestApplication;
  let client: TestClient;
  let newUser: User;
  let randomProduct: Product;
  let accessToken: string;
  let newComment: Comment;

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

    newComment = await Comment.create({
      userId: newUser.id,
      productId: randomProduct.id,
      body: goodBody,
    }).save();
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([newUser.remove(), newComment.remove()]);
    await app.close();
  });

  describe("body", () => {
    it("must be at least 3 characters", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.editComment(
          {
            input: {
              id: newComment.id,
              body: badBody,
            },
          },
          accessToken,
        ),
        client.mutation.editComment(
          {
            input: {
              id: newComment.id,
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

      expect(badResponse.status).toBe(200);
      expect(goodResponse.status).toBe(200);
      expect(badResponse.body.data).not.toBeNull();
      expect(goodResponse.body.data).not.toBeNull();
      expect(badResponse.body.data!.editComment.errors).toEqual(expectedError);
      expect(goodResponse.body.data!.editComment.errors).not.toEqual(
        expectedError,
      );
    });
  });
});
