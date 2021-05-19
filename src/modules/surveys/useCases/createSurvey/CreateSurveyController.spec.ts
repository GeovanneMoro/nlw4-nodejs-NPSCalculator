import request from "supertest";
import { Connection } from "typeorm";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/index";

let connection: Connection;

describe("Create Survey Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    // await connection.close();
  });

  it("should be able to create a new survey", async () => {
    const response = await request(app)
      .post("/surveys")
      .send({ title: "Title example", description: "Description example" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
