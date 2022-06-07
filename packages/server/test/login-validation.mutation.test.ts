import { User } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@login-validation.com",
  username: "testing-login-validation",
};

const fakePassword = "fake-password";
const fakeInput: Pick<User, "email" | "username"> = {
  email: "fake@email.com",
  username: "fake-username",
};

describe("login mutation validation", () => {
  let app: INestApplication;
  let client: TestClient;
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
  });

  afterAll(async () => {
    // limpa user do banco de dados para evitar dúplicas nos testes
    await user.remove();
    await app.close();
  });

  describe("email", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.login({
          input: {
            email: null,
            password: "",
          },
        }),
        client.mutation.login({
          input: {
            email: userInput.email,
            password: "",
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "email",
          message: expect.stringContaining("must input"),
        },
      ]);

      expect(badResponse.body.data.login.errors).toEqual(expectedError);
      expect(goodResponse.body.data.login.errors).not.toEqual(expectedError);
    });

    it("is valid e-mail", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.login({
          input: {
            email: "notvalidemail.com",
            password: "",
          },
        }),
        client.mutation.login({
          input: {
            email: userInput.email,
            password: "",
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "email",
          message: expect.stringContaining("valid email"),
        },
      ]);

      expect(badResponse.body.data.login.errors).toEqual(expectedError);
      expect(goodResponse.body.data.login.errors).not.toEqual(expectedError);
    });
  });

  describe("username", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.login({
          input: {
            username: null,
            password: "",
          },
        }),
        client.mutation.login({
          input: {
            username: userInput.username,
            password: "",
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "username",
          message: expect.stringContaining("must input"),
        },
      ]);

      expect(badResponse.body.data.login.errors).toEqual(expectedError);
      expect(goodResponse.body.data.login.errors).not.toEqual(expectedError);
    });
  });

  describe("password", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.login({
          input: { password: "" },
        }),
        client.mutation.login({
          input: { password },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("required"),
        },
      ]);

      expect(badResponse.body.data.login.errors).toEqual(expectedError);
      expect(goodResponse.body.data.login.errors).not.toEqual(expectedError);
    });
  });

  describe("invalid credentials", () => {
    it("returns invalid credentials for email and password", async () => {
      const responses = await Promise.all([
        client.mutation.login({
          input: {
            email: fakeInput.email,
            password,
          },
        }),
        client.mutation.login({
          input: {
            email: userInput.email,
            password: fakePassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("inválidas"),
        },
        {
          path: "email",
          message: expect.stringContaining("inválidas"),
        },
      ]);

      for (const response of responses) {
        expect(response.body.data.login.errors).toEqual(expectedError);
      }
    });

    it("returns invalid credentials for username and password", async () => {
      const responses = await Promise.all([
        client.mutation.login({
          input: {
            username: fakeInput.username,
            password,
          },
        }),
        client.mutation.login({
          input: {
            username: userInput.username,
            password: fakePassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("inválidas"),
        },
        {
          path: "username",
          message: expect.stringContaining("inválidas"),
        },
      ]);

      for (const response of responses) {
        expect(response.body.data.login.errors).toEqual(expectedError);
      }
    });

    it("returns invalid credentials for email, username and password", async () => {
      const responses = await Promise.all([
        client.mutation.login({
          input: {
            ...fakeInput,
            password,
          },
        }),
        client.mutation.login({
          input: {
            ...fakeInput,
            password: fakePassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("inválidas"),
        },
        {
          path: "email",
          message: expect.stringContaining("inválidas"),
        },
        {
          path: "username",
          message: expect.stringContaining("inválidas"),
        },
      ]);

      for (const response of responses) {
        expect(response.body.data.login.errors).toEqual(expectedError);
      }
    });
  });
});
