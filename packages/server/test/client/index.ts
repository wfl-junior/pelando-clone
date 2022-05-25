import { INestApplication } from "@nestjs/common";
import { TestMutationClient } from "./TestMutationClient";
import { TestQueryClient } from "./TestQueryClient";

export class TestClient {
  public query: TestQueryClient;
  public mutation: TestMutationClient;

  constructor(app: INestApplication) {
    this.query = new TestQueryClient(app);
    this.mutation = new TestMutationClient(app);
  }
}
