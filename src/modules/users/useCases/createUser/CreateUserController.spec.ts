import request from "supertest";
import { Connection } from "typeorm";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/index";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Jhon Doe", email: "jhondoe@email.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should not be able to create a user with exists email", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Jhon Doe", email: "jhondoe@email.com" });

    expect(response.status).toBe(400);
  });
});
