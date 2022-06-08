import { getEntityNotFoundMessage } from "@/src/utils/getEntityNotFoundMessage";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { TestClient } from "./client";
import { getRandomProduct } from "./utils/getRandomProduct";
import { transformEntityDatesToString } from "./utils/transformDatesToString";

describe("product query", () => {
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

  it("returns product if it exists", async () => {
    const randomProduct = await getRandomProduct();

    const response = await client.query.product({
      input: {
        where: {
          id: randomProduct.id,
        },
      },
    });

    expect(response.status).toBe(200);

    const { ok, errors, product } = response.body.data.product;

    expect(ok).toBe(true);
    expect(errors).toBeNull();
    expect(product).not.toBeNull();
    expect(product).toEqual(transformEntityDatesToString(randomProduct));
  });

  it("returns not found error if it doesn't exist", async () => {
    const response = await client.query.product({
      input: {
        where: {
          id: "id-that-doesn't-exist",
        },
      },
    });

    expect(response.status).toBe(200);

    const { ok, errors, product } = response.body.data.product;

    expect(ok).toBe(false);
    expect(product).toBeNull();
    expect(errors).not.toBeNull();
    expect(errors).toEqual(
      expect.arrayContaining([
        {
          path: "id",
          message: getEntityNotFoundMessage("Product"),
        },
      ]),
    );
  });
});
