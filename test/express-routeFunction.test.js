import express from "express";
import request from "supertest";

const app = express();

app
  .route("/product")
  .get((req, res) => {
    res.send("Get product");
  })
  .post((req, res) => {
    res.send("Create product");
  })
  .put((req, res) => {
    res.send("Update product");
  });

test("Route Function", async () => {
  let response = await request(app).get("/product");
  expect(response.text).toBe("Get product");

  response = await request(app).post("/product");
  expect(response.text).toBe("Create product");

  response = await request(app).put("/product");
  expect(response.text).toBe("Update product");
});
