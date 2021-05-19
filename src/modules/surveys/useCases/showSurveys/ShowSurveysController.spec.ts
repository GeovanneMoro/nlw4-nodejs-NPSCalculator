import request from "supertest";
import { Connection } from "typeorm";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm/index";

let connection: Connection;

describe("Show Surveys Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    // await connection.close();
  });

  it("should be able to get all surveys", async () => {
    await request(app)
      .post("/surveys")
      .send({ title: "Title example", description: "Description example" });

    await request(app)
      .post("/surveys")
      .send({ title: "Title example 2", description: "Description example 2" });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
