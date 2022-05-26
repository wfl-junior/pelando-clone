import { User } from "@/src/entities";
import { getRandomNumberBetween } from "@/src/utils/getRandomNumberBetween";
import { createAccessToken } from "@/src/utils/jwt";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

const password = "secretish-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "me@test.com",
  username: "iamme",
};

describe("me query", () => {
  let app: INestApplication;
  let client: TestClient;
  let newUser: User;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);

    newUser = await User.create({
      ...userInput,
      password,
      productVoteValue: getRandomNumberBetween(6, 7),
    }).save();

    accessToken = createAccessToken(newUser);
  });

  afterAll(async () => {
    // limpa user do banco de dados para evitar dúplicas nos testes
    await newUser.remove();
    await app.close();
  });

  it("returns user if access token is received", async () => {
    const response = await client.query.me(accessToken);

    expect(response.status).toBe(200);

    const { ok, errors, user } = response.body.data!.me;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(user).not.toBeNull();
    expect(transformEntityDatesToString(newUser)).toEqual(
      expect.objectContaining(user),
    );
  });

  it("throws Unauthorized error if no access token is received", async () => {
    const response = await client.query.me();

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
