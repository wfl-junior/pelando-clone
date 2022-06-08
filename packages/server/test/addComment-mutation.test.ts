import { Comment, Product, User } from "@/src/entities";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { TestAddCommentMutationResponse } from "./client/types";
import { getRandomProduct } from "./utils/getRandomProduct";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@add-comment-mutation.com",
  username: "testing-comment_mutation",
};

const body = "hello world";

describe("addComment mutation", () => {
  let app: INestApplication;
  let client: TestClient;
  let newUser: User;
  let randomProduct: Product;
  let accessToken: string;
  let response: TestAddCommentMutationResponse;
  let newComment: Comment | null = null;

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

    response = await client.mutation.addComment(
      {
        input: {
          productId: randomProduct.id,
          body,
        },
      },
      accessToken,
    );

    if (response.body.data?.addComment.comment) {
      newComment = await Comment.findOne({
        where: {
          id: response.body.data.addComment.comment.id,
        },
        select: {
          id: true,
          userId: true,
        },
      });
    }
  });

  afterAll(async () => {
    // limpa entities do banco de dados para evitar dúplicas nos testes
    await Promise.all([
      newUser.remove(),
      Comment.delete({ userId: newUser.id }),
    ]);
    await app.close();
  });

  it("logged in user can add comment", () => {
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBeNull();
  });

  it("returns correct data", () => {
    const { ok, errors, comment } = response.body.data!.addComment;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(comment).not.toBeNull();
    expect(comment).toEqual(
      expect.objectContaining({
        body,
      }),
    );
    expect(transformEntityDatesToString(newUser)).toEqual(
      expect.objectContaining(comment!.user),
    );
  });

  it("inserts the comment into the database", () => {
    expect(newComment).not.toBeNull();
  });

  it("creates the comment for the right user", () => {
    const { comment } = response.body.data!.addComment;
    expect(newComment!.userId).toEqual(comment!.user.id);
  });

  it("throws Unauthorized error if no access token is received", async () => {
    const response = await client.mutation.addComment({
      input: {
        productId: randomProduct.id,
        body,
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
