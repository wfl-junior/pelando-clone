import { User } from "@/src/entities";
import { TokenPayload } from "@/src/utils/jwt";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import setCookieParser from "set-cookie-parser";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { TestLoginMutationResponse } from "./client/types";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@login-successful.com",
  username: "testing-login-successful",
};

describe("login mutation successful", () => {
  let app: INestApplication;
  let client: TestClient;
  let response: TestLoginMutationResponse;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);

    user = await User.create({
      ...userInput,
      password,
    }).save();

    response = await client.mutation.login({
      input: {
        email: userInput.email,
        username: userInput.username,
        password,
      },
    });
  });

  afterAll(async () => {
    // limpa user do banco de dados para evitar dúplicas nos testes
    await user.remove();
    await app.close();
  });

  it("user can login", async () => {
    expect(response.status).toBe(200);
  });

  it("user can login with only email", async () => {
    const response = await client.mutation.login({
      input: {
        email: userInput.email,
        password,
      },
    });

    expect(response.status).toBe(200);
  });

  it("user can login with only username", async () => {
    const response = await client.mutation.login({
      input: {
        username: userInput.username,
        password,
      },
    });

    expect(response.status).toBe(200);
  });

  it("response is ok and doesn't have errors", async () => {
    const { ok, errors } = response.body.data.login;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
  });

  it("response has access token and it is valid", async () => {
    const { accessToken } = response.body.data.login;

    expect(accessToken).not.toBeNull();

    function getToken() {
      return verify(
        accessToken!,
        process.env.JWT_ACCESS_TOKEN_SECRET,
      ) as TokenPayload;
    }

    expect(getToken).not.toThrow(JsonWebTokenError);

    const token = getToken();

    expect(token.id).toBe(user.id);
  });

  it("response sends refresh token set cookie header and it is valid", async () => {
    const setCookieHeader = response.headers["set-cookie"];

    expect(setCookieHeader).toBeDefined();

    const cookies = setCookieParser(setCookieHeader);
    const cookie = cookies.find(
      cookie => cookie.name === process.env.COOKIE_NAME,
    );

    expect(cookie).toBeDefined();

    function getToken() {
      return verify(
        cookie!.value,
        process.env.JWT_REFRESH_TOKEN_SECRET,
      ) as TokenPayload;
    }

    expect(getToken).not.toThrow(JsonWebTokenError);

    const token = getToken();

    expect(token.id).toBe(user.id);
  });
});
