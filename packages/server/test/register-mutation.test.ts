import { User } from "@/src/entities";
import { RegisterInput } from "@/src/graphql-types/Input/users/RegisterInput";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import bcrypt from "bcrypt";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import setCookieParser from "set-cookie-parser";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { TestRegisterMutationResponse } from "./client/types";

const password = "super-secret-password";
const userInput: Omit<RegisterInput, "password"> = {
  email: "test@test.com",
  username: "testing",
};

describe("register mutation", () => {
  let app: INestApplication;
  let client: TestClient;
  let response: TestRegisterMutationResponse;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);

    response = await client.mutation.register({
      input: {
        ...userInput,
        password,
      },
    });
  });

  afterAll(async () => {
    await Promise.all([
      app.close(),
      // limpa users do banco de dados para evitar dúplicas nos testes
      User.createQueryBuilder().delete().execute(),
    ]);
  });

  it("user can register", async () => {
    expect(response.status).toBe(200);

    const user = await User.findOne({
      where: userInput,
      select: {
        email: true,
        username: true,
      },
    });

    expect(user).not.toBeNull();
    expect(userInput).toEqual(user);
  });

  it("registered user's password was hashed", async () => {
    const user = await User.findOne({
      where: userInput,
      select: {
        password: true,
      },
    });

    expect(password).not.toBe(user!.password);
    expect(await bcrypt.compare(password, user!.password)).toBe(true);
  });

  it("response is ok and doesn't have errors", async () => {
    const { ok, errors } = response.body.data.register;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
  });

  it("response has access token and it is valid", async () => {
    const { accessToken } = response.body.data.register;

    expect(accessToken).not.toBeNull();
    expect(() => {
      verify(accessToken!, process.env.JWT_ACCESS_TOKEN_SECRET);
    }).not.toThrow(JsonWebTokenError);
  });

  it("register mutation sends jwt set cookie header and it is valid", () => {
    const setCookieHeader = response.headers["set-cookie"];

    expect(setCookieHeader).toBeDefined();

    const cookies = setCookieParser(setCookieHeader);
    const cookie = cookies.find(
      cookie => cookie.name === process.env.COOKIE_NAME,
    );

    expect(cookie).toBeDefined();

    expect(() => {
      verify(cookie!.value, process.env.JWT_REFRESH_TOKEN_SECRET);
    }).not.toThrow(JsonWebTokenError);
  });
});
