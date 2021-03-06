import { Comment, Product, User } from "@/src/entities";
import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@delete-comment-mutation.com",
  username: "testing-delete-comment_mutation",
};

describe("deleteComment mutation", () => {
  let app: INestApplication;
  let client: TestClient;
  let randomProduct: Product;
  let newUser: User;
  let accessToken: string;
  let otherNewUser: User;
  let otherAccessToken: string;
  let newComment: Comment;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);

    [newUser, randomProduct, otherNewUser] = await Promise.all([
      User.create({
        ...userInput,
        password,
      }).save(),
      getRandomProduct(),
      User.create({
        password,
        email: `${userInput.email}-hackermans`,
        username: `${userInput.username}-hackermans`,
      }).save(),
    ]);

    accessToken = createAccessToken(newUser);
    otherAccessToken = createAccessToken(otherNewUser);

    newComment = await Comment.create({
      userId: newUser.id,
      productId: randomProduct.id,
      body: "hello world",
    }).save();
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([
      newUser.remove(),
      otherNewUser.remove(),
      Comment.delete({ userId: newUser.id }),
    ]);
    await app.close();
  });

  it("returns you must be the owner error if logged in user is not the owner", async () => {
    const response = await client.mutation.deleteComment(
      { id: newComment.id },
      otherAccessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors } = response.body.data!.deleteComment;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "userId",
          message: expect.stringContaining("you must be the owner"),
        },
      ]),
    );
  });

  it("logged in user can delete comment", async () => {
    const response = await client.mutation.deleteComment(
      { id: newComment.id },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors } = response.body.data!.deleteComment;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
  });

  it("comment was removed from the database", async () => {
    const comment = await Comment.findOne({
      where: {
        id: newComment.id,
      },
    });

    expect(comment).toBeNull();
  });

  it("returns not found for nonexistent comment", async () => {
    const response = await client.mutation.deleteComment(
      { id: newComment.id },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors } = response.body.data!.deleteComment;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "id",
          message: getEntityNotFoundMessage("Comment"),
        },
      ]),
    );
  });

  it("throws Unauthorized error if no access token is received", async () => {
    const response = await client.mutation.deleteComment({
      id: newComment.id,
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
});
