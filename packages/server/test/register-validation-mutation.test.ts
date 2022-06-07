import { User } from "@/src/entities";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";

const password = "some-super-secret-password";
const userInput: Pick<User, "email" | "username"> = {
  email: "test@register-validation.com",
  username: "testing-register-validation",
};

const badPassword = "1234567";
const badEmail = "test-register.com";

const badUsernames = [
  "0test",
  "test-0",
  "test_0",
  "%test%",
  "%test_%",
  "%-test",
];

const goodUsernames = [
  "test-register",
  "test_register",
  "test_áàâãéèêí",
  "test-ïóôõöúçñ",
];

const badInput: Pick<User, "email" | "username"> = {
  email: badEmail,
  username: badUsernames[0],
};

describe("register mutation validation", () => {
  let app: INestApplication;
  let client: TestClient;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    client = new TestClient(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("email", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.register({
          input: {
            email: "",
            username: badInput.username,
            password: badPassword,
          },
        }),
        client.mutation.register({
          input: {
            email: userInput.email,
            username: badInput.username,
            password: badPassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "email",
          message: expect.stringContaining("required"),
        },
      ]);

      expect(badResponse.body.data.register.errors).toEqual(expectedError);
      expect(goodResponse.body.data.register.errors).not.toEqual(expectedError);
    });

    it("is valid e-mail", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.register({
          input: {
            email: badEmail,
            username: badInput.username,
            password: badPassword,
          },
        }),
        client.mutation.register({
          input: {
            email: userInput.email,
            username: badInput.username,
            password: badPassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "email",
          message: expect.stringContaining("valid email"),
        },
      ]);

      expect(badResponse.body.data.register.errors).toEqual(expectedError);
      expect(goodResponse.body.data.register.errors).not.toEqual(expectedError);
    });
  });

  describe("username", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.register({
          input: {
            email: badInput.email,
            username: "",
            password: badPassword,
          },
        }),
        client.mutation.register({
          input: {
            email: badInput.email,
            username: userInput.username,
            password: badPassword,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "username",
          message: expect.stringContaining("required"),
        },
      ]);

      expect(badResponse.body.data.register.errors).toEqual(expectedError);
      expect(goodResponse.body.data.register.errors).not.toEqual(expectedError);
    });

    it("is valid username", async () => {
      const [badResponses, goodResponses] = await Promise.all([
        Promise.all(
          badUsernames.map(username =>
            client.mutation.register({
              input: {
                email: badInput.email,
                password: badPassword,
                username,
              },
            }),
          ),
        ),
        Promise.all(
          goodUsernames.map(username =>
            client.mutation.register({
              input: {
                email: badInput.email,
                password: badPassword,
                username,
              },
            }),
          ),
        ),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "username",
          message: expect.stringContaining(
            "must be only alpha, - and _ characters",
          ),
        },
      ]);

      for (const response of badResponses) {
        expect(response.body.data.register.errors).toEqual(expectedError);
      }

      for (const response of goodResponses) {
        expect(response.body.data.register.errors).not.toEqual(expectedError);
      }
    });
  });

  describe("password", () => {
    it("is required", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.register({
          input: {
            ...badInput,
            password: "",
          },
        }),
        client.mutation.register({
          input: {
            ...badInput,
            password,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("required"),
        },
      ]);

      expect(badResponse.body.data.register.errors).toEqual(expectedError);
      expect(goodResponse.body.data.register.errors).not.toEqual(expectedError);
    });

    it("must be at least 8 characters", async () => {
      const [badResponse, goodResponse] = await Promise.all([
        client.mutation.register({
          input: {
            ...badInput,
            password: "",
          },
        }),
        client.mutation.register({
          input: {
            ...badInput,
            password,
          },
        }),
      ]);

      const expectedError = expect.arrayContaining([
        {
          path: "password",
          message: expect.stringContaining("must be at least 8 characters"),
        },
      ]);

      expect(badResponse.body.data.register.errors).toEqual(expectedError);
      expect(goodResponse.body.data.register.errors).not.toEqual(expectedError);
    });
  });
});
