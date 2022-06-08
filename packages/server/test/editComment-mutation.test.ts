import { Comment, Product, User } from "@/src/entities";
import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { TestEditCommentMutationResponse } from "./client/types";
import { getRandomProduct } from "./utils/getRandomProduct";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@edit-comment-mutation.com",
  username: "testing-edit-comment_mutation",
};

const body = "hello world";
const newBody = "you shall not pass";

describe("addComment mutation", () => {
  let app: INestApplication;
  let client: TestClient;
  let randomProduct: Product;
  let newUser: User;
  let accessToken: string;
  let otherNewUser: User;
  let otherAccessToken: string;
  let response: TestEditCommentMutationResponse;
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
      body,
    }).save();

    response = await client.mutation.editComment(
      {
        input: {
          id: newComment.id,
          body: newBody,
        },
      },
      accessToken,
    );
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([
      newUser.remove(),
      newComment.remove(),
      otherNewUser.remove(),
    ]);
    await app.close();
  });

  it("logged in user can edit comment", () => {
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();
  });

  it("returns correct data", () => {
    const { ok, errors, comment } = response.body.data!.editComment;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comment).not.toBeNull();
    expect(comment).toEqual(
      expect.objectContaining(
        transformEntityDatesToString({
          id: newComment.id,
          body: newBody,
          createdAt: newComment.createdAt,
        }),
      ),
    );
    expect(transformEntityDatesToString(newUser)).toEqual(
      expect.objectContaining(comment!.user),
    );
    expect(transformEntityDatesToString(randomProduct)).toEqual(
      expect.objectContaining(comment!.product),
    );
  });

  it("updates the comment in the database", async () => {
    const comment = await Comment.findOneOrFail({
      where: {
        id: newComment.id,
      },
      select: {
        id: true,
        body: true,
      },
    });

    expect(comment.body).not.toBe(body);
    expect(comment.body).toBe(newBody);
  });

  it("returns you must be the owner error if logged in user is not the owner", async () => {
    const response = await client.mutation.editComment(
      {
        input: {
          id: newComment.id,
          body: newBody,
        },
      },
      otherAccessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, comment } = response.body.data!.editComment;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(comment).toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "userId",
          message: expect.stringContaining("you must be the owner"),
        },
      ]),
    );
  });

  it("returns not found for nonexistent comment", async () => {
    const response = await client.mutation.editComment(
      {
        input: {
          id: "hello-world",
          body: newBody,
        },
      },
      accessToken,
    );

    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();

    const { ok, errors, comment } = response.body.data!.editComment;

    expect(ok).toBe(false);
    expect(errors).not.toBeNull();
    expect(comment).toBeNull();
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
    const response = await client.mutation.editComment({
      input: {
        id: newComment.id,
        body: newBody,
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
});
