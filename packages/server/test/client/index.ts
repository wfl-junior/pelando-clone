import { INestApplication } from "@nestjs/common";
import { TestQueryClient } from "./TestQueryClient";

export class TestClient {
  public query: TestQueryClient;

  constructor(app: INestApplication) {
    this.query = new TestQueryClient(app);
  }
}
